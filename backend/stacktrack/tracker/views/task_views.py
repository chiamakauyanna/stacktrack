from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from tracker.models import Task, Stage
from tracker.serializers import TaskSerializer
from tracker.utils import success_response, error_response
from .pagination import StandardResultsSetPagination

@extend_schema_view(
    list=extend_schema(summary="List all tasks in a stage"),
    create=extend_schema(summary="Create a task in a stage"),
    retrieve=extend_schema(summary="Retrieve task details"),
    update=extend_schema(summary="Update a task"),
    destroy=extend_schema(summary="Delete a task"),
)

@extend_schema(tags=['Tasks'])
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'stage', 'assigned_to']
    search_fields = ['title', 'description', 'status', 'priority']
    ordering_fields = ['due_date', 'created_at', 'priority']

    def get_queryset(self):
        stage_id = self.kwargs.get('stage_pk')
        return Task.objects.filter(stage_id=stage_id).order_by('-created_at')

    def perform_create(self, serializer):
        stage = get_object_or_404(Stage, id=self.kwargs['stage_pk'])
        assigned_to = serializer.validated_data.get('assigned_to', self.request.user)
        serializer.save(stage=stage, assigned_to=assigned_to)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return success_response("Task created successfully.", serializer.data, status_code=status.HTTP_201_CREATED)
        return error_response("Task creation failed.", serializer.errors)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=kwargs.pop('partial', False))
        if serializer.is_valid():
            self.perform_update(serializer)
            return success_response("Task updated successfully.", serializer.data)
        return error_response("Task update failed.", serializer.errors)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return success_response("Task deleted successfully.")
