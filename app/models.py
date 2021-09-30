from django.db import models

class Task(models.Model):
    task_name = models.CharField(max_length=64)
    task_check = models.BooleanField(default=False)
    task_date = models.DateField(auto_now_add=True)

