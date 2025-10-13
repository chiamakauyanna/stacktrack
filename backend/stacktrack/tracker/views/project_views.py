from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from tracker.models import Project, Task
from tracker.serializers import ProjectSerializer
from tracker.utils import success_response, error_response
from .pagination import StandardResultsSetPagination


@extend_schema(tags=['Projects'])
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().select_related(
        'owner').prefetch_related('stages__tasks')
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'owner']
    search_fields = ['title', 'description', 'status']
    ordering_fields = ['created_at', 'title', 'updated_at']

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # ---------------------------
    # Override responses
    # ---------------------------

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return success_response(
                message="Project created successfully.",
                data=serializer.data,
                status_code=status.HTTP_201_CREATED
            )
        return error_response("Project creation failed.", serializer.errors)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=kwargs.pop('partial', False))
        if serializer.is_valid():
            self.perform_update(serializer)
            return success_response("Project updated successfully.", serializer.data)
        return error_response("Project update failed.", serializer.errors)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return success_response("Project deleted successfully.")
    
    
    # ---------------------------
    # Custom actions
    # ---------------------------

    @action(detail=True, methods=['get'])
    def progress(self, request, pk=None):
        project = self.get_object()
        return success_response("Project progress retrieved.", {"progress": project.progress()})

    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        project = self.get_object()
        return success_response("Project statistics retrieved.", project.task_statistics())

    @action(detail=False, methods=['get'], url_path='my-projects')
    def my_projects(self, request):
        user = request.user
        projects = Project.objects.filter(owner=user)
        project_data = ProjectSerializer(projects, many=True).data
        total_tasks = Task.objects.filter(stage__project__owner=user).count()
        completed_tasks = Task.objects.filter(
            stage__project__owner=user, status='done').count()

        summary = {
            "total_projects": projects.count(),
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": total_tasks - completed_tasks if total_tasks else 0,
            "project_progress": {p.title: p.progress() for p in projects}
        }

        return success_response("User projects retrieved.", {
            "user": user.username,
            "summary": summary,
            "projects": project_data
        })
