# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings

from django.contrib.auth.models import Group, User


def add_admin_user_to_admin_group(apps, schema_editor):
    try:
        admin_group = Group.objects.get(name=settings.USER_GROUPS['ADMIN'])
        admin_user = User.objects.get(username=settings.DEFAULT_ADMIN_USERNAME)
        admin_user.groups.add(admin_group)
        admin_user.save()
    except (User.DoesNotExist, Group.DoesNotExist):
        pass


def add_non_admin_users_to_public_group(apps, schema_editor):
    try:
        public_group = Group.objects.get(name=settings.USER_GROUPS['READ_ONLY'])
        non_admin_users = User.objects.exclude(username=settings.DEFAULT_ADMIN_USERNAME)
        for user in non_admin_users:
            user.groups.add(public_group)
            user.save()
    except (User.DoesNotExist, Group.DoesNotExist):
        pass


class Migration(migrations.Migration):
    dependencies = [
        ('ashlar_auth', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_admin_user_to_admin_group, migrations.RunPython.noop),
        migrations.RunPython(add_non_admin_users_to_public_group, migrations.RunPython.noop),
    ]
