from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ProjectSerializer
from .models import Project

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    
    # Add search and ordering capabilities
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'owner__username']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'title']
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)