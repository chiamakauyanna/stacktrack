from rest_framework import viewsets, filters, generics, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ProjectSerializer, StageSerializer, TaskSerializer, RegistrationSerializer, ProfileSerializer
from .models import Project, Stage, Task
from django.contrib.auth.models import User
from rest_framework.pagination import PageNumberPagination
from drf_spectacular.utils import extend_schema
from .utils import success_response, error_response
from rest_framework import status


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
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
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

    
# ---------------------------
# Stage ViewSet
# ---------------------------

@extend_schema(tags=['Stages'])
class StageViewSet(viewsets.ModelViewSet):
    serializer_class = StageSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['order', 'created_at']
    filterset_fields = ['project']

    def get_queryset(self):
        project_id = self.kwargs.get('project_pk')
        return Stage.objects.filter(project_id=project_id).order_by('order', '-created_at')

    def perform_create(self, serializer):
        project_id = self.kwargs.get('project_pk')
        serializer.save(project_id=project_id)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return success_response(
            message="Stage created successfully.",
            data=serializer.data,
            status_code=status.HTTP_201_CREATED
        )


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return success_response("Stage deleted successfully.")


# ---------------------------
# Task ViewSet
# ---------------------------

@extend_schema(tags=['Tasks'])
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'stage', 'assigned_to']
    search_fields = ['title', 'description', 'status', 'priority']
    ordering_fields = ['due_date', 'created_at', 'priority']

    def get_queryset(self):
        stage_id = self.kwargs.get('stage_pk')
        return Task.objects.filter(stage_id=stage_id).order_by('-created_at')

    def perform_create(self, serializer):
        stage_id = self.kwargs.get('stage_pk')
        serializer.save(stage_id=stage_id)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return success_response("Task created successfully.", serializer.data, status_code=status.HTTP_201_CREATED)
        return error_response("Task creation failed.", serializer.errors)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            return success_response("Task updated successfully.", serializer.data)
        return error_response("Task update failed.", serializer.errors)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return success_response("Task deleted successfully.")


# ---------------------------
# Authentication ViewSet
# ---------------------------

# User Registration

@extend_schema(tags=['Auth'], summary='Register a new user')
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return success_response(
                "User registered successfully.",
                {"username": user.username, "email": user.email},
                status_code=status.HTTP_201_CREATED
            )
        return error_response("Registration failed.", serializer.errors)


@extend_schema(tags=['Auth'], summary='Retrieve or update profile')
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response("Profile updated successfully.", serializer.data)
        return error_response("Profile update failed.", serializer.errors)
