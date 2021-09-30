from django.forms import model_to_dict
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .forms import FormTask
from .models import Task



def index(request) -> JsonResponse:
    task_list = []
    if request.method == 'GET':
        form = FormTask()
        task_li = Task.objects.all()
    else:
        if request.is_ajax:
            form = FormTask(request.POST)
            if form.is_valid():
                form.save()
                latest = Task.objects.latest('id').id
                task_obj = model_to_dict(Task.objects.get(pk=latest))
                return JsonResponse({'error': False, 'data': task_obj})
            else:
                return JsonResponse({'error': True, 'data': form.errors})
        else:
            error = {'message': 'Error'}
            return JsonResponse(error, content_type="application/json")
    return render(request, 'index.html', {'form': form, 'task_li': task_li})

def delete(request):
    if request.method == 'POST':
        if request.is_ajax:
            current_elem_id = request.POST.get('id', None)
            current_elem = get_object_or_404(klass=Task, pk=current_elem_id)
            print(current_elem)
            print(current_elem_id)
            current_elem.delete()
            return JsonResponse({'error': False, 'data': current_elem_id})
    return render(request, 'index.html')



