from .models import Project
from rest_framework import serializers


class ProjectSerializer(serializers.ModelSerializer):
  # StringRelatedField shows username instead of the user ID
  owner = serializers.StringRelatedField(read_only=True)
  
  class Meta:
    model = Project
    fields = '__all__'
    read_only_fields = ['slug']