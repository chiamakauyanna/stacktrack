from .models import Project
from rest_framework import serializers


class ProjectSerializer(serializers.ModelSerializer):
  model = Project
  fields = '__all__'