from django.urls import path, include
from rest_framework_nested import routers
from .views import ProjectViewSet, StageViewSet, TaskViewSet, UserRegistrationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# -------------------
# Nested routers
# -------------------

# Parent router
router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

# Nested router for stages under projects
projects_router = routers.NestedDefaultRouter(router, r'projects', lookup='project')
projects_router.register(r'stages', StageViewSet, basename='project-stages')

# Nested router for tasks under stages
stages_router = routers.NestedDefaultRouter(projects_router, r'stages', lookup='stage')
stages_router.register(r'tasks', TaskViewSet, basename='stage-tasks')

# -------------------
# URL patterns
# -------------------
urlpatterns = [
    # Nested API
    path('', include(router.urls)),
    path('', include(projects_router.urls)),
    path('', include(stages_router.urls)),

    # Authentication endpoints
    path('auth/register/', UserRegistrationView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
