from rest_framework import generics, permissions, status
from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema
from tracker.serializers import RegistrationSerializer, ProfileSerializer
from tracker.utils import success_response, error_response


@extend_schema(tags=['Auth'], summary='Register a new user')
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return success_response("User registered successfully.",
                                    {"username": user.username,
                                        "email": user.email},
                                    status_code=status.HTTP_201_CREATED)
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
