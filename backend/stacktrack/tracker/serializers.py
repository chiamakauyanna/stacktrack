from .models import Project, Stage, Task
from rest_framework import serializers

# ---------------------------
# Task Serializer
# ---------------------------
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

# ---------------------------
# Stage Serializer
# ---------------------------
class StageSerializer(serializers.ModelSerializer):
    # Nested tasks for this stage
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Stage
        fields = '__all__'
        read_only_fields = ['created_at', 'order']

# ---------------------------
# Project Serializer
# ---------------------------
class ProjectSerializer(serializers.ModelSerializer):
    # Show username instead of user ID
    owner = serializers.StringRelatedField(read_only=True)
    # Nested stages for this project
    stages = StageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['slug', 'created_at', 'updated_at']
