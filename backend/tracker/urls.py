from django.urls import path, include, register_converter
from rest_framework_nested import routers
from .views import ProjectViewSet, StageViewSet, TaskViewSet, RegisterView, ProfileView, CustomTokenObtainPairView, CustomTokenRefreshView
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
router.register(r'stages', StageViewSet, basename='stage')
router.register(r'tasks', TaskViewSet, basename='task')


# -------------------------
# URL Patterns
# -------------------------
urlpatterns = [
    # Main API routes
    path('', include(router.urls)),

     # Auth endpoints
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('auth/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),  
    path('auth/profile/', ProfileView.as_view(), name='profile'),
]
