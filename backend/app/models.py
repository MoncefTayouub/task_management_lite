from django.db import models
from datetime import datetime, date

# Create your models here.
class project(models.Model):
    name = models.TextField()

class task (models.Model) :
    parentProject = models.ForeignKey(project, on_delete=models.CASCADE,null=True,blank=True)
    name = models.TextField()
    DDL = models.DateField(("Date"), default=date.today)

class steps(models.Model):
    parentTask = models.ForeignKey(task, on_delete=models.CASCADE,null=True,blank=True)
    name = models.TextField()
    done = models.BooleanField(default=False)
