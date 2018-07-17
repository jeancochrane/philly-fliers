"""
Override app config to register signal for setting default user group on user creation.
"""
from django.apps import AppConfig
from django.db.models.signals import post_save


def add_to_default_group(sender, **kwargs):
    from django.conf import settings
    from django.contrib.auth.models import Group

    # Make sure that the settings file is configured properly to allow for
    # permissioning.
    if not getattr(settings, 'USER_GROUPS'):
        raise AttributeError('Could not find the USER_GROUPS config in your settings file.')
    else:
        if not settings.USER_GROUPS.get('READ_ONLY'):
            raise KeyError('The USER_GROUPS variable in your settings file requires a READ_ONLY attribute.')

    READ_GROUP = settings.USER_GROUPS['READ_ONLY']

    user = kwargs["instance"]
    if kwargs["created"]:
        group = Group.objects.get(name=READ_GROUP)
        user.groups.add(group)


class GroutAuthConfig(AppConfig):
    name = 'grout_auth'
    verbose_name = 'Authentication and permissions for the Grout server'

    def ready(self):
        from django.contrib.auth.models import User
        post_save.connect(add_to_default_group, sender=User)
