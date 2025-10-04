from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

# ---------------------------
# Project Model
# ---------------------------


class Project(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    slug = models.SlugField(unique=True, blank=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='draft')
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='projects')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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
        total_tasks = Task.objects.filter(stage__project=self).count()
        completed_tasks = Task.objects.filter(
            stage__project=self, status='done').count()
        return int((completed_tasks / total_tasks) * 100) if total_tasks else 0

    # Returns task statistics: completed vs pending
    def task_statistics(self):
        total_tasks = Task.objects.filter(stage__project=self).count()
        completed_tasks = Task.objects.filter(
            stage__project=self, status='done').count()
        pending_tasks = total_tasks - completed_tasks
        return {
            "total": total_tasks,
            "completed": completed_tasks,
            "pending": pending_tasks
        }


# ---------------------------
# Stage Model
# ---------------------------
class Stage(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='stages')
    title = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']

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
        ('in-progress', 'In Progress'),
        ('done', 'Done'),
    ]

    stage = models.ForeignKey(
        Stage, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='todo')
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.status})"
