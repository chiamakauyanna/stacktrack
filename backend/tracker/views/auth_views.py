from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import generics, permissions, status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema

from tracker.serializers import RegistrationSerializer, ProfileSerializer
from tracker.models import Profile
from tracker.utils import success_response, error_response


# -----------------------------------------------------
# Custom JWT Views
# -----------------------------------------------------

@extend_schema(
    tags=["Auth"],
    summary="Login to obtain access and refresh tokens",
    description="Authenticate with username and password to receive JWT tokens and profile data."
)
class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Extends JWT login to include user profile data in the response.
    """
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        username = request.data.get("username")
        try:
            user = User.objects.get(username=username)
            profile = user.profile
            serialized_profile = ProfileSerializer(profile, context={"request": request})
            response.data["profile"] = serialized_profile.data
        except User.DoesNotExist:
            response.data["profile"] = None  # fallback in rare cases

        return response


@extend_schema(
    tags=["Auth"],
    summary="Refresh access token",
    description="Use refresh token to obtain a new access token."
)
class CustomTokenRefreshView(TokenRefreshView):
    pass


# -----------------------------------------------------
# User Registration
# -----------------------------------------------------
@extend_schema(tags=['Auth'], summary='Register a new user')
class RegisterView(generics.CreateAPIView):
    """
    Handles user registration, profile creation, and JWT token generation.
    """
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                profile = user.profile  # created automatically

                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                tokens = {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }

                # Serialize profile
                serialized_profile = ProfileSerializer(profile, context={"request": request})

                return success_response(
                    "User registered successfully.",
                    {
                        "tokens": tokens,
                        "profile": serialized_profile.data,
                    },
                    status_code=status.HTTP_201_CREATED
                )

            except Exception as e:
                user.delete()  # rollback user if profile creation fails
                return error_response("Registration failed during processing.", str(e))

        return error_response("Registration failed.", serializer.errors)


# -----------------------------------------------------
# Profile Retrieve / Update View
# -----------------------------------------------------
@extend_schema(tags=['Auth'], summary='Retrieve or update authenticated user profile')
class ProfileView(generics.RetrieveUpdateAPIView):
    """
    Allows users to retrieve or update their own profile.
    Supports avatar uploads (base64 image format).
    """
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return success_response("Profile updated successfully.", serializer.data)
        return error_response("Profile update failed.", serializer.errors)
