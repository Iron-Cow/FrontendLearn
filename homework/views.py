from django.shortcuts import render
from os import listdir


def get_html_task_range():
    return range(1, len(listdir('templates/homework/html'))+1)


def index(request):
    homework_list = get_html_task_range()
    return render(request, 'homework/index.html', {'homework_list': homework_list})


def html_task(request, task_id: int):
    data = dict()
    homework_list = get_html_task_range()
    data['homework_list'] = homework_list
    return render(request, f'homework/html/hw{task_id}.html', data)
