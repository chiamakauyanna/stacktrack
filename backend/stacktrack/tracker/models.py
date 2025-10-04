from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

# Create your models here.
class Project(models.Model):
  STATUS_CHOICES = [
    ('draft', 'Draft'),
    ('in_progress', 'In Progress'),
    ('completed', 'Completed')
  ]
  
  title = models.CharField(max_length=100)
  description = models.TextField(blank=True)
  slug = models.SlugField(unique=True, blank=True)
  status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
  owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  
  def save(self, *args, **kwargs):
    # Automatically create slug from title if not provided
    if not self.slug:
      self.slug = slugify(self.title)
    super().save(*args, **kwargs)
  
  def __str__(self):
    return self.title