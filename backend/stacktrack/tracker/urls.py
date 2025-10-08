from django.urls import path, include, register_converter
from rest_framework_nested import routers
from .views import ProjectViewSet, StageViewSet, TaskViewSet, RegisterView, ProfileView
import uuid


# -------------------------
# UUID Converter
# -------------------------
class UUIDConverter:
    regex = '[0-9a-f-]{36}'

    def to_python(self, value):
        return uuid.UUID(value)

    def to_url(self, value):
        return str(value)


register_converter(UUIDConverter, 'uuid')


# -------------------------
# Routers
# -------------------------
router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

# Nested router: stages under projects
projects_router = routers.NestedDefaultRouter(router, r'projects', lookup='project')
projects_router.register(r'stages', StageViewSet, basename='project-stages')

# Nested router: tasks under stages
stages_router = routers.NestedDefaultRouter(projects_router, r'stages', lookup='stage')
stages_router.register(r'tasks', TaskViewSet, basename='stage-tasks')


# -------------------------
# URL Patterns
# -------------------------
urlpatterns = [
    # Main API routes
    path('', include(router.urls)),
    path('', include(projects_router.urls)),
    path('', include(stages_router.urls)),

    # Auth endpoints
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
]
