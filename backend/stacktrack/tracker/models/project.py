import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.apps import apps

class Project(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('completed', 'Completed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    slug = models.SlugField(unique=True, blank=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='draft')
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='projects')
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
        completed_tasks = Task.objects.filter(
            stage__project=self, status='done').count()
        return int((completed_tasks / total_tasks) * 100) if total_tasks else 0

    # Returns task statistics: completed vs pending
    def task_statistics(self):
        Task = apps.get_model('tracker', 'Task')
        total_tasks = Task.objects.filter(stage__project=self).count()
        completed_tasks = Task.objects.filter(
            stage__project=self, status='done').count()
        pending_tasks = total_tasks - completed_tasks
        return {
            "total": total_tasks,
            "completed": completed_tasks,
            "pending": pending_tasks,
        }
        
    def update_status_based_on_tasks(self):
        """Automatically updates the project status based on task completion."""
        Task = apps.get_model('tracker', 'Task')
        all_tasks = Task.objects.filter(stage__project=self)
        total = all_tasks.count()
        done = all_tasks.filter(status="done").count()

        if total == 0:
            self.status = "draft"
        elif done == total:
            self.status = "completed"
        else:
            self.status = "active"

        self.save(update_fields=["status"])

