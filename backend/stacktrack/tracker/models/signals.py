from django.db.models.signals import post_save
from django.dispatch import receiver
from .project import Project
from .stage import Stage

@receiver(post_save, sender=Project)
def create_default_stage(sender, instance, created, **kwargs):
    """Automatically create a 'Planning' stage when a project is created."""
    if created and not instance.stages.exists():
        Stage.objects.create(project=instance, title="Planning", order=1)
