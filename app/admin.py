from django.contrib import admin
from .models import *


@admin.register(Task)
class AdminTask(admin.ModelAdmin):
    pass

# Register your models here.
