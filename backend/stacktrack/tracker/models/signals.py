from django.db.models.signals import post_save
from django.dispatch import receiver
from .project import Project
from .stage import Stage

# Feature toggle for auto stage creation
ENABLE_DEFAULT_STAGE_CREATION = False

@receiver(post_save, sender=Project)
def create_default_stage(sender, instance, created, **kwargs):
    """
    (Optional) Automatically create a 'Planning' stage when a project is created.
    Controlled by ENABLE_DEFAULT_STAGE_CREATION.
    """
    if not ENABLE_DEFAULT_STAGE_CREATION:
        return  # <-- disables behavior safely

    if created and not instance.stages.exists():
        Stage.objects.create(project=instance, title="Planning", order=1)
