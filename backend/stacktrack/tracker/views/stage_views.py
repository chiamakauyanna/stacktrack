from rest_framework import viewsets, status, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from tracker.models import Stage, Project
from tracker.serializers import StageSerializer
from tracker.utils import success_response
from .pagination import StandardResultsSetPagination
from django.shortcuts import get_object_or_404


@extend_schema_view(
    list=extend_schema(summary="List stages for a project"),
    create=extend_schema(summary="Create a new stage in a project"),
    retrieve=extend_schema(summary="Retrieve stage details"),
    update=extend_schema(summary="Update a stage"),
    destroy=extend_schema(summary="Delete a stage"),
)

@extend_schema_view(
    list=extend_schema(summary="List stages for a project"),
    create=extend_schema(summary="Create a new stage in a project"),
    retrieve=extend_schema(summary="Retrieve stage details"),
    update=extend_schema(summary="Update a stage"),
    destroy=extend_schema(summary="Delete a stage"),
)

@extend_schema(tags=['Stages'])
class StageViewSet(viewsets.ModelViewSet):
    serializer_class = StageSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['project']
    ordering_fields = ['order', 'created_at']

    def get_queryset(self):
        project_id = self.kwargs.get('project_pk')
        return Stage.objects.filter(project_id=project_id).order_by('order', '-created_at')

    def perform_create(self, serializer):
        project = get_object_or_404(Project, id=self.kwargs['project_pk'], owner=self.request.user)
        last_order = Stage.objects.filter(project=project).count() + 1
        serializer.save(project=project, order=last_order)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return success_response("Stage created successfully.", serializer.data, status_code=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return success_response("Stage deleted successfully.")
