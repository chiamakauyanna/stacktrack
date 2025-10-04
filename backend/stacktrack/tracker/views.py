from rest_framework import viewsets, filters, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ProjectSerializer, StageSerializer, TaskSerializer, UserRegistrationSerializer
from .models import Project, Stage, Task
from django.contrib.auth.models import User

# ---------------------------
# Project ViewSet
# ---------------------------
class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'title']

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


# ---------------------------
# Stage ViewSet
# ---------------------------
class StageViewSet(viewsets.ModelViewSet):
    serializer_class = StageSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['order', 'created_at']

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
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'title']

    def get_queryset(self):
        stage_id = self.kwargs.get('stage_pk')  # nested router passes this
        return Task.objects.filter(stage_id=stage_id).order_by('-created_at')

    def perform_create(self, serializer):
        stage_id = self.kwargs.get('stage_pk')
        serializer.save(stage_id=stage_id)
        

# ---------------------------
# Authentication ViewSet
# ---------------------------

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = []  # Anyone can register