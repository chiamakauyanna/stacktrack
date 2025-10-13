from django.db import models

class Stage(models.Model):
    project = models.ForeignKey('tracker.Project', on_delete=models.CASCADE, related_name='stages')
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
