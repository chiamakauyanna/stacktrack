from rest_framework import viewsets, status, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from tracker.models import Stage
from tracker.serializers import StageSerializer
from tracker.utils import success_response
from .pagination import StandardResultsSetPagination


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
        project_id = self.kwargs.get('project_pk')
        serializer.save(project_id=project_id)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return success_response("Stage created successfully.", serializer.data, status_code=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return success_response("Stage deleted successfully.")
