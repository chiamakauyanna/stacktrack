from rest_framework import viewsets, filters, generics, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ProjectSerializer, StageSerializer, TaskSerializer, RegistrationSerializer, ProfileSerializer
from .models import Project, Stage, Task
from django.contrib.auth.models import User
from rest_framework.pagination import PageNumberPagination


# ---------------------------
# Pagination
# ---------------------------

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


# ---------------------------
# Project ViewSet
# ---------------------------
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

    @action(detail=True, methods=['get'])
    def progress(self, request, pk=None):
        project = self.get_object()
        return Response({"progress": project.progress()})

    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        project = self.get_object()
        return Response(project.task_statistics())

    @action(detail=False, methods=['get'], url_path='my-projects')
    def my_projects(self, request):
        user = request.user

        # Fetch user projects
        projects = Project.objects.filter(owner=user)

        # Serialize projects
        project_data = ProjectSerializer(projects, many=True).data

        # Compute total and completed tasks for all projects
        total_tasks = Task.objects.filter(stage__project__owner=user).count()
        completed_tasks = Task.objects.filter(
            stage__project__owner=user, status='done'
        ).count()

        # Compute summary
        summary = {
            "total_projects": projects.count(),
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": total_tasks - completed_tasks if total_tasks else 0,
            "project_progress": {
                project.title: project.progress() for project in projects
            }

        }

        return Response({
            "user": user.username,
            "summary": summary,
            "projects": project_data
        })


# ---------------------------
# Stage ViewSet
# ---------------------------
class StageViewSet(viewsets.ModelViewSet):
    queryset = Stage.objects.all().select_related('project')
    serializer_class = StageSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['order', 'created_at']
    search_fields = ['title']
    filterset_fields = ['project']

    def get_queryset(self):
        project_id = self.kwargs.get('project_pk')  # nested router passes this
        return Stage.objects.filter(project_id=project_id).order_by('order', '-created_at')

    def perform_create(self, serializer):
        project_id = self.kwargs.get('project_pk')
        serializer.save(project_id=project_id)


# ---------------------------
# Task ViewSet
# ---------------------------
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().select_related('stage', 'assigned_to')
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'stage', 'assigned_to']
    search_fields = ['title', 'description', 'status', 'priority']
    ordering_fields = ['due_date', 'created_at', 'priority']

    def get_queryset(self):
        stage_id = self.kwargs.get('stage_pk')  # nested router passes this
        return Task.objects.filter(stage_id=stage_id).order_by('-created_at')

    def perform_create(self, serializer):
        stage_id = self.kwargs.get('stage_pk')
        serializer.save(stage_id=stage_id)


# ---------------------------
# Authentication ViewSet
# ---------------------------

# User Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]

# Get or Update Current User Profile


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile
