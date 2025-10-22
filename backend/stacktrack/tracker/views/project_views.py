from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from tracker.models import Project, Task
from tracker.serializers import ProjectNestedSerializer
from tracker.utils import success_response, error_response
from .pagination import StandardResultsSetPagination


@extend_schema_view(
    list=extend_schema(summary="List all projects"),
    create=extend_schema(summary="Create a new project (with optional stages & tasks)"),
    retrieve=extend_schema(summary="Retrieve project details"),
    update=extend_schema(summary="Update a project"),
    destroy=extend_schema(summary="Delete a project"),
)
@extend_schema(tags=["Projects"])
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().select_related("owner").prefetch_related("stages__tasks")
    serializer_class = ProjectNestedSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["status", "owner"]
    search_fields = ["title", "description", "status"]
    ordering_fields = ["created_at", "title", "updated_at"]

    def get_queryset(self):
        # Only return projects owned by the authenticated user
        return Project.objects.filter(owner=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # ---------------------------
    # Standard CRUD Overrides
    # ---------------------------

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return success_response(
                "Project created successfully.",
                serializer.data,
                status_code=status.HTTP_201_CREATED,
            )
        return error_response("Project creation failed.", serializer.errors)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            return success_response("Project updated successfully.", serializer.data)
        return error_response("Project update failed.", serializer.errors)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return success_response("Project deleted successfully.")

    # ---------------------------
    # Custom Actions
    # ---------------------------

    @action(detail=True, methods=["get"])
    def progress(self, request, pk=None):
        """Return the project's calculated progress"""
        project = self.get_object()
        return success_response("Project progress retrieved.", {"progress": project.progress()})

    @action(detail=True, methods=["get"])
    def stats(self, request, pk=None):
        """Return project task statistics"""
        project = self.get_object()
        return success_response("Project statistics retrieved.", project.task_statistics())

    @action(detail=False, methods=["get"], url_path="my-projects")
    def my_projects(self, request):
        """List all projects owned by the user, with summary stats"""
        user = request.user
        projects = Project.objects.filter(owner=user).prefetch_related('stages__tasks')
        serializer = self.get_serializer(projects, many=True)
        total_tasks = Task.objects.filter(stage__project__owner=user).count()
        completed_tasks = Task.objects.filter(stage__project__owner=user, status="done").count()

        summary = {
            "total_projects": projects.count(),
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": total_tasks - completed_tasks if total_tasks else 0,
            "project_progress": {p.title: p.progress() for p in projects},
        }

        return success_response(
            "User projects retrieved.",
            {"user": user.username, "summary": summary, "projects": project_data},
        )

    # ---------------------------
    # Custom Action: Update Project Status
    # ---------------------------

    @extend_schema(
        summary="Update project status",
        description="Allows only the project owner to update the project status (e.g., draft → active → completed).",
        request={"application/json": {"type": "object", "properties": {"status": {"type": "string"}}}},
        responses={200: ProjectNestedSerializer},
    )
    @action(detail=True, methods=["patch"], url_path="update-status")
    def update_status(self, request, pk=None):
        project = self.get_object()
        user = request.user
        new_status = request.data.get("status")

        if not new_status:
            return error_response("Status field is required.")

        # Only owner can update project status
        if project.owner != user:
            return error_response("You do not have permission to update this project’s status.", status.HTTP_403_FORBIDDEN)

        project.status = new_status
        project.save()

        serializer = self.get_serializer(project)
        return success_response("Project status updated successfully.", serializer.data)
