from tracker.models import Project, Stage, Task
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

class TaskNestedSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='assigned_to', required=False, allow_null=True
    )

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'status', 'priority', 'due_date',
            'assigned_to', 'assigned_to_id', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at',
                            'updated_at', 'status']  # status updated later

# ---------------------------
# Stage Serializer
# ---------------------------


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

        # Update or create tasks
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

# ---------------------------
# Project Serializer
# ---------------------------


class ProjectNestedSerializer(serializers.ModelSerializer):
    stages = StageNestedSerializer(many=True, required=False)
    owner = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'slug', 'owner', 'status',
            'stages', 'progress', 'task_statistics', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'slug', 'progress', 'task_statistics', 'created_at', 'updated_at', 'status']

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

                # Update or create tasks for this stage
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
                # New stage
                stage = Stage.objects.create(
                    project=instance, order=order, **stage_data)
                for task_data in tasks_data:
                    Task.objects.create(stage=stage, **task_data)

        return instance
