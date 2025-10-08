from django.urls import path, include
from rest_framework_nested import routers
from .views import ProjectViewSet, StageViewSet, TaskViewSet, RegisterView, ProfileView

# Main router
router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

# Nested router: stages under projects
projects_router = routers.NestedDefaultRouter(router, r'projects', lookup='project')
projects_router.register(r'stages', StageViewSet, basename='project-stages')

# Nested router: tasks under stages
stages_router = routers.NestedDefaultRouter(projects_router, r'stages', lookup='stage')
stages_router.register(r'tasks', TaskViewSet, basename='stage-tasks')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(projects_router.urls)),
    path('', include(stages_router.urls)),

    # Auth endpoints
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
]
