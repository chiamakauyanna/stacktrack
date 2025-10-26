from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from rest_framework import serializers
from tracker.models import Project, Stage, Task, Profile

from PIL import Image
from io import BytesIO
import base64
import uuid
import binascii


# -----------------------------------------------------
# Custom Field: Handles Base64-encoded images (avatars)
# -----------------------------------------------------
class Base64ImageField(serializers.ImageField):
    """
    A DRF ImageField that accepts base64-encoded image data.
    Example:
      data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
    """

    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            try:
                header, base64_data = data.split(';base64,')
                file_ext = header.split('/')[-1]
                decoded_file = base64.b64decode(base64_data)
            except (ValueError, binascii.Error):
                raise serializers.ValidationError("Invalid base64 image data")

            file_name = f"{uuid.uuid4()}.{file_ext}"

            # Verify the file is a valid image
            try:
                file_ext_detected = Image.open(
                    BytesIO(decoded_file)).format.lower()
                if not file_ext_detected:
                    raise serializers.ValidationError(
                        "Unsupported image type.")
            except Exception:
                raise serializers.ValidationError("Invalid image content.")

            data = ContentFile(decoded_file, name=file_name)

        return super().to_internal_value(data)


# -----------------------------------------------------
# Profile Serializer
# -----------------------------------------------------
class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    avatar = Base64ImageField(required=False, allow_null=True)

    def to_representation(self, instance):
        """Ensure full image URL is returned."""
        data = super().to_representation(instance)
        request = self.context.get('request')
        if instance.avatar and request:
            data['avatar'] = request.build_absolute_uri(instance.avatar.url)
        return data

    class Meta:
        model = Profile
        fields = ['username', 'email', 'bio', 'avatar', 'role']


# -----------------------------------------------------
# User Serializer
# -----------------------------------------------------
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']


# -----------------------------------------------------
# Registration Serializer
# -----------------------------------------------------
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
        Profile.objects.get_or_create(user=user)
        return user


# -----------------------------------------------------
# Task Serializer (Nested)
# -----------------------------------------------------
class TaskNestedSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='assigned_to',
        required=False,
        allow_null=True
    )

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'status', 'priority',
            'due_date', 'assigned_to', 'assigned_to_id',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'status']


# -----------------------------------------------------
# Stage Serializer (Nested)
# -----------------------------------------------------
class StageNestedSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    tasks = TaskNestedSerializer(many=True, required=False)

    class Meta:
        model = Stage
        fields = ['id', 'title', 'order', 'tasks', 'created_at']
        read_only_fields = ['created_at', 'order']

    def create(self, validated_data):
        tasks_data = validated_data.pop('tasks', [])
        stage = Stage.objects.create(**validated_data)
        for task_data in tasks_data:
            Task.objects.create(stage=stage, **task_data)
        return stage

    def update(self, instance, validated_data):
        tasks_data = validated_data.pop('tasks', [])
        instance.title = validated_data.get('title', instance.title)
        instance.save()

        existing_tasks = {str(task.id): task for task in instance.tasks.all()}
        for task_data in tasks_data:
            task_id = str(task_data.get('id', ''))
            if task_id and task_id in existing_tasks:
                task = existing_tasks[task_id]
                for attr, value in task_data.items():
                    if attr != 'id':
                        setattr(task, attr, value)
                task.save()
            else:
                Task.objects.create(stage=instance, **task_data)
        return instance


# -----------------------------------------------------
# Project Serializer (Nested)
# -----------------------------------------------------
class ProjectNestedSerializer(serializers.ModelSerializer):
    stages = StageNestedSerializer(many=True, required=False)
    owner = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'slug', 'owner', 'status',
            'stages', 'progress', 'task_statistics',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'slug', 'progress', 'task_statistics',
            'created_at', 'updated_at', 'status'
        ]

    def create(self, validated_data):
        stages_data = validated_data.pop('stages', [])
        project = Project.objects.create(**validated_data)

        for order, stage_data in enumerate(stages_data):
            tasks_data = stage_data.pop('tasks', [])
            stage = Stage.objects.create(
                project=project, order=order, **stage_data)
            for task_data in tasks_data:
                Task.objects.create(stage=stage, **task_data)
        return project

    def update(self, instance, validated_data):
        stages_data = validated_data.pop('stages', [])
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.save()

        existing_stages = {
            str(stage.id): stage for stage in instance.stages.all()}

        for order, stage_data in enumerate(stages_data):
            stage_id = str(stage_data.get('id', ''))
            tasks_data = stage_data.pop('tasks', [])

            if stage_id and stage_id in existing_stages:
                stage = existing_stages[stage_id]
                stage.title = stage_data.get('title', stage.title)
                stage.order = order
                stage.save()

                existing_tasks = {
                    str(task.id): task for task in stage.tasks.all()}
                for task_data in tasks_data:
                    task_id = str(task_data.get('id', ''))
                    if task_id and task_id in existing_tasks:
                        task = existing_tasks[task_id]
                        for attr, value in task_data.items():
                            if attr != 'id':
                                setattr(task, attr, value)
                        task.save()
                    else:
                        Task.objects.create(stage=stage, **task_data)
            else:
                stage = Stage.objects.create(
                    project=instance, order=order, **stage_data)
                for task_data in tasks_data:
                    Task.objects.create(stage=stage, **task_data)

        return instance

# -----------------------------------------------------
# Project Analysis
# -----------------------------------------------------


class ProjectSummarySerializer(serializers.Serializer):
    total_projects = serializers.IntegerField()
    completed_projects = serializers.IntegerField()
    active_projects = serializers.IntegerField()
    draft_projects = serializers.IntegerField()
    average_project_progress = serializers.FloatField()
    total_tasks = serializers.IntegerField()
    completed_tasks = serializers.IntegerField()
    pending_tasks = serializers.IntegerField()


class TrendSerializer(serializers.Serializer):
    week_start = serializers.DateField()
    completed_tasks = serializers.IntegerField()


class ProjectBreakdownSerializer(serializers.Serializer):
    id = serializers.CharField()
    title = serializers.CharField()
    status = serializers.CharField()
    progress = serializers.FloatField()
    total_tasks = serializers.IntegerField()
    completed_tasks = serializers.IntegerField()
    pending_tasks = serializers.IntegerField()
    last_updated = serializers.CharField()


class ProjectAnalyticsSerializer(serializers.Serializer):
    summary = ProjectSummarySerializer()
    trend = TrendSerializer(many=True)
    projects = ProjectBreakdownSerializer(many=True)
