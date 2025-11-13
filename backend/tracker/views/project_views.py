from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from django.db.models import Count
from django.db.models.functions import TruncWeek
from tracker.models import Project, Task
from tracker.serializers import ProjectNestedSerializer, ProjectAnalyticsSerializer
from tracker.utils import success_response, error_response
from .pagination import StandardResultsSetPagination


@extend_schema_view(
    list=extend_schema(summary="List all projects"),
    create=extend_schema(
        summary="Create a new project (with optional stages & tasks)"),
    retrieve=extend_schema(summary="Retrieve project details"),
    update=extend_schema(summary="Update a project"),
    destroy=extend_schema(summary="Delete a project"),
)
@extend_schema(tags=["Projects"])
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().select_related(
        "owner").prefetch_related("stages__tasks")
    serializer_class = ProjectNestedSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["status", "owner"]
    search_fields = ["title", "description", "status"]
    ordering_fields = ["created_at", "title", "updated_at"]

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # ---------------------------
    # CRUD Overrides
    # ---------------------------

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return success_response("Project created successfully.", serializer.data, status_code=status.HTTP_201_CREATED)
        return error_response("Project creation failed.", serializer.errors)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
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
        project = self.get_object()
        return success_response("Project progress retrieved.", {"progress": project.progress()})

    @action(detail=True, methods=["get"])
    def stats(self, request, pk=None):
        project = self.get_object()
        return success_response("Project statistics retrieved.", project.task_statistics())

    @action(detail=False, methods=["get"], url_path="my-projects")
    def my_projects(self, request):
        user = request.user
        projects = Project.objects.filter(
            owner=user).prefetch_related('stages__tasks')
        serializer = self.get_serializer(projects, many=True)
        total_tasks = Task.objects.filter(stage__project__owner=user).count()
        completed_tasks = Task.objects.filter(
            stage__project__owner=user, status="done").count()

        summary = {
            "total_projects": projects.count(),
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": total_tasks - completed_tasks if total_tasks else 0,
            "project_progress": {p.title: p.progress() for p in projects},
        }

        return success_response("User projects retrieved.", {
            "user": user.username,
            "summary": summary,
            "projects": serializer.data,
        })

    @extend_schema(
        summary="Update project status",
        description="Allows only the project owner to update the project status (e.g., draft → active → completed).",
        request={"application/json": {"type": "object",
                                      "properties": {"status": {"type": "string"}}}},
        responses={200: ProjectNestedSerializer},
    )
    @action(detail=True, methods=["patch"], url_path="update-status")
    def update_status(self, request, pk=None):
        project = self.get_object()
        user = request.user
        new_status = request.data.get("status")

        if not new_status:
            return error_response("Status field is required.")

        if project.owner != user:
            return error_response("You do not have permission to update this project’s status.", status.HTTP_403_FORBIDDEN)

        project.status = new_status
        project.save()

        serializer = self.get_serializer(project)
        return success_response("Project status updated successfully.", serializer.data)

    # ---------------------------
    # NEW: Analytics Endpoint
    # ---------------------------

    @extend_schema(
        summary="Get project analytics",
        description="Returns project summary stats, trends, and per-project breakdown.",
        responses={200: ProjectAnalyticsSerializer},
    )
    @action(detail=False, methods=["get"], url_path="analytics")
    def analytics(self, request):
        user = request.user
        projects = Project.objects.filter(
            owner=user).prefetch_related("stages__tasks")

        total_projects = projects.count()
        completed_projects = projects.filter(status="completed").count()
        active_projects = projects.filter(status="active").count()
        draft_projects = projects.filter(status="draft").count()

        tasks = Task.objects.filter(stage__project__owner=user)
        total_tasks = tasks.count()
        completed_tasks = tasks.filter(status="done").count()
        pending_tasks = total_tasks - completed_tasks if total_tasks else 0

        avg_progress = (
            sum(p.progress() for p in projects) /
            total_projects if total_projects > 0 else 0
        )

        weekly_trend = (
            tasks.filter(status="done")
            .annotate(week=TruncWeek("updated_at"))
            .values("week")
            .annotate(completed=Count("id"))
            .order_by("week")
        )

        trend_data = [
            {"week_start": entry["week"].strftime(
                "%Y-%m-%d"), "completed_tasks": entry["completed"]}
            for entry in weekly_trend
        ]

        project_breakdown = []
        for project in projects:
            stats = project.task_statistics()
            project_breakdown.append({
                "id": str(project.id),
                "title": project.title,
                "status": project.status,
                "progress": project.progress(),
                "total_tasks": stats["total"],
                "completed_tasks": stats["completed"],
                "pending_tasks": stats["pending"],
                "last_updated": project.updated_at.strftime("%Y-%m-%d %H:%M"),
            })

        data = {
            "summary": {
                "total_projects": total_projects,
                "completed_projects": completed_projects,
                "active_projects": active_projects,
                "draft_projects": draft_projects,
                "average_project_progress": round(avg_progress, 1),
                "total_tasks": total_tasks,
                "completed_tasks": completed_tasks,
                "pending_tasks": pending_tasks,
            },
            "trend": trend_data,
            "projects": project_breakdown,
        }

        return success_response("Project analytics retrieved successfully.", data)
