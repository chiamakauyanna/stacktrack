from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from tracker.models import Task, Stage
from tracker.serializers import TaskNestedSerializer
from tracker.utils import success_response, error_response
from .pagination import StandardResultsSetPagination


@extend_schema_view(
    list=extend_schema(summary="List all tasks"),
    create=extend_schema(summary="Create a new task"),
    retrieve=extend_schema(summary="Retrieve task details"),
    update=extend_schema(summary="Update a task"),
    destroy=extend_schema(summary="Delete a task"),
)
@extend_schema(tags=['Tasks'])
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskNestedSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'stage', 'assigned_to']
    search_fields = ['title', 'description', 'status', 'priority']
    ordering_fields = ['due_date', 'created_at', 'priority']

    def get_queryset(self):
        # Limit tasks to those belonging to the authenticated user’s projects
        return Task.objects.filter(stage__project__owner=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        stage_id = self.request.data.get('stage')
        if not stage_id:
            raise ValueError("A stage ID is required to create a task.")
        stage = get_object_or_404(Stage, id=stage_id, project__owner=self.request.user)

        assigned_to = serializer.validated_data.get('assigned_to', None)
        serializer.save(stage=stage, assigned_to=assigned_to)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return success_response("Task created successfully.", serializer.data, status_code=status.HTTP_201_CREATED)
        return error_response("Task creation failed.", serializer.errors)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response("Task updated successfully.", serializer.data)
        return error_response("Task update failed.", serializer.errors)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return success_response("Task deleted successfully.")

    # ---------------------------
    # Custom Action: Update Status
    # ---------------------------
    @extend_schema(
        summary="Update task status",
        description="Allows the project owner or assigned user to update the task status.",
        request={"application/json": {"type": "object", "properties": {"status": {"type": "string"}}}},
        responses={200: TaskNestedSerializer},
    )
    @action(detail=True, methods=['patch'], url_path='update-status')
    def update_status(self, request, pk=None):
        task = self.get_object()
        user = request.user
        new_status = request.data.get("status")

        if not new_status:
            return error_response("Status field is required.")

        # Permission check — only owner or assigned user can update
        if task.stage.project.owner != user and task.assigned_to != user:
            return error_response("You do not have permission to update this task’s status.", status.HTTP_403_FORBIDDEN)

        task.status = new_status
        task.save()

        serializer = self.get_serializer(task)
        return success_response("Task status updated successfully.", serializer.data)
