from django.urls import path, include
from rest_framework_nested import routers
from .views import ProjectViewSet, StageViewSet, TaskViewSet

# Parent router
router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

# Nested router for stages under projects
projects_router = routers.NestedDefaultRouter(router, r'projects', lookup='project')
projects_router.register(r'stages', StageViewSet, basename='project-stages')

# Nested router for tasks under stages
stages_router = routers.NestedDefaultRouter(projects_router, r'stages', lookup='stage')
stages_router.register(r'tasks', TaskViewSet, basename='stage-tasks')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(projects_router.urls)),
    path('', include(stages_router.urls)),
]
