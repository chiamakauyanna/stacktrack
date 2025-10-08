from .models import Project, Stage, Task, Profile
from rest_framework import serializers
from django.contrib.auth.models import User

# ---------------------------
# Authentication Serializer
# --------------------------

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'avatar', 'role']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
# ---------------------------
# Task Serializer
# ---------------------------
class TaskSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    assigned_to = UserSerializer(read_only=True)
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        source='assigned_to', queryset=User.objects.all(), write_only=True, required=False
    )
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

# ---------------------------
# Stage Serializer
# ---------------------------
class StageSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    # Nested tasks for this stage
    tasks = TaskSerializer(many=True, read_only=True)
    progress = serializers.SerializerMethodField()

    class Meta:
        model = Stage
        fields = '__all__'
        read_only_fields = ['created_at', 'order']
        
    def get_progress(self, obj):
        return obj.progress()

# ---------------------------
# Project Serializer
# ---------------------------
class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    # Show username instead of user ID
    owner = serializers.StringRelatedField(read_only=True)
    # Nested stages for this project
    stages = StageSerializer(many=True, read_only=True)
    progress = serializers.SerializerMethodField()
    task_statistics = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['slug', 'created_at', 'updated_at']

    def get_progress(self, obj):
        return obj.progress()

    def get_task_statistics(self, obj):
        return obj.task_statistics()