# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Activity(models.Model):
    activity_id = models.AutoField(primary_key=True)
    activity_type = models.CharField(max_length=20)
    hours = models.IntegerField()
    message = models.CharField(max_length=800)
