from rest_framework import generics, permissions, status
from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema
from tracker.serializers import RegistrationSerializer, ProfileSerializer
from tracker.models import Profile
from tracker.utils import success_response, error_response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# --------------------------
# Custom JWT Views for Docs
# --------------------------


@extend_schema(
    tags=["Auth"],
    summary="Login to obtain access and refresh tokens",
    description="Authenticate user with username and password to receive JWT tokens."
)
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Attach profile info
        try:
            user = User.objects.get(username=request.data.get("username"))
            profile = Profile.objects.get(user=user)
            serialized_profile = ProfileSerializer(profile)
            response.data["profile"] = serialized_profile.data
        except User.DoesNotExist:
            pass  # edge case if user not found
        return response


@extend_schema(
    tags=["Auth"],
    summary="Refresh access token",
    description="Use refresh token to obtain a new access token."
)
class CustomTokenRefreshView(TokenRefreshView):
    pass


# --------------------------
# Register & Profile Views
# --------------------------

@extend_schema(tags=['Auth'], summary='Register a new user')
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            profile = Profile.objects.create(user=user)

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            tokens = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }

            # Serialize the profile
            serialized_profile = ProfileSerializer(profile)

            return success_response(
                "User registered successfully.",
                {
                    "tokens": tokens,
                    "profile": serialized_profile.data,
                },
                status_code=status.HTTP_201_CREATED
            )
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
