from django import forms
from .models import *


class FormTask(forms.ModelForm):
    class Meta:
        model = Task
        fields = '__all__'
        labels = {
            'task_name': 'Название',
            'task_check': 'Выполнено',
            'task_date': 'Дата задачи'
        }

        widgets = {
        'task_name': forms.TextInput(attrs={'class':'form-control'}),
        'task_check':forms.CheckboxInput(),
        'task_date':forms.TextInput(attrs={'class':'form-control'})

        }