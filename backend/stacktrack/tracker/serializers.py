from tracker.models import Project, Stage, Task, Profile
from rest_framework import serializers
from django.contrib.auth.models import User
from django.utils import timezone

# ---------------------------
# Authentication Serializers
# ---------------------------

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
        Profile.objects.create(user=user)
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
        fields = [
            'id', 'title', 'description', 'status', 'priority', 'due_date',
            'assigned_to', 'assigned_to_id', 'stage', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'stage']
        
        
    def validate_due_date(self, value):
        if value < timezone.now().date():
            raise serializers.ValidationError("Due date cannot be in the past.")
        return value





# ---------------------------
# Stage Serializer
# ---------------------------
class StageSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)
    progress = serializers.SerializerMethodField()

    class Meta:
        model = Stage
        fields = ['id', 'title', 'project', 'order', 'progress', 'tasks', 'created_at']
        read_only_fields = ['project', 'order', 'created_at', 'progress', 'tasks']
        
    def get_progress(self, obj):
        return obj.progress()


# ---------------------------
# Project Serializer
# ---------------------------
class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    owner = serializers.StringRelatedField(read_only=True)
    stages = StageSerializer(many=True, read_only=True)
    progress = serializers.SerializerMethodField()
    task_statistics = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'slug', 'owner', 'status',
            'progress', 'task_statistics', 'stages', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at', 'status']

    def get_progress(self, obj):
        return obj.progress()

    def get_task_statistics(self, obj):
        return obj.task_statistics()
