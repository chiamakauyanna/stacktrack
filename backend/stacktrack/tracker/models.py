import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.apps import apps
from django.db.models.signals import post_save
from django.dispatch import receiver


# ---------------------------
# Profile Model
# ---------------------------

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    role = models.CharField(max_length=50, default='member')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"


# ---------------------------
# Project Model
# ---------------------------

class Project(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    slug = models.SlugField(unique=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            n = 1
            while Project.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{n}"
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    # Returns project completion % based on tasks
    def progress(self):
        Task = apps.get_model('tracker', 'Task')
        total_tasks = Task.objects.filter(stage__project=self).count()
        completed_tasks = Task.objects.filter(stage__project=self, status='done').count()
        return int((completed_tasks / total_tasks) * 100) if total_tasks else 0

    # Returns task statistics: completed vs pending
    def task_statistics(self):
        Task = apps.get_model('tracker', 'Task')
        total_tasks = Task.objects.filter(stage__project=self).count()
        completed_tasks = Task.objects.filter(stage__project=self, status='done').count()
        pending_tasks = total_tasks - completed_tasks
        return {
            "total": total_tasks,
            "completed": completed_tasks,
            "pending": pending_tasks,
        }


# ---------------------------
# Stage Model
# ---------------------------

class Stage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='stages')
    title = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = "Stage"
        verbose_name_plural = "Stages"

    def __str__(self):
        return f"{self.title} ({self.project.title})"

    # Returns stage completion % based on tasks
    def progress(self):
        total_tasks = self.tasks.count()
        completed_tasks = self.tasks.filter(status='done').count()
        return int((completed_tasks / total_tasks) * 100) if total_tasks else 0


# ---------------------------
# Task Model
# ---------------------------

class Task(models.Model):
    STATUS_CHOICES = [
        ('todo', 'To Do'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
    ]

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='todo')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    due_date = models.DateField(null=True, blank=True)
    assigned_to = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_tasks'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Task"
        verbose_name_plural = "Tasks"

    def __str__(self):
        return f"{self.title} ({self.status})"


# ---------------------------
# Signals
# ---------------------------

@receiver(post_save, sender=Project)
def create_default_stage(sender, instance, created, **kwargs):
    """Automatically create a 'Planning' stage when a project is created."""
    if created and not instance.stages.exists():
        Stage.objects.create(project=instance, title="Planning", order=1)
