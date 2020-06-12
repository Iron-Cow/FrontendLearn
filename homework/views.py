from django.shortcuts import render, HttpResponse
from django.template import TemplateDoesNotExist
from os import listdir, path
from FrontendLearn.settings import BASE_DIR


def get_task_range(kind: str = 'html'):
    print(listdir(f'templates/homework/{kind}'))
    return range(1, len(list(filter(lambda x: 'homework' in x or 'hw' in x, listdir(f'templates/homework/{kind}'))))+1)


def index(request):
    data = dict()
    data['homework_list_html'] = get_task_range('html')
    data['homework_list_js'] = get_task_range('js')
    return render(request, 'homework/index.html', data)


def html_task(request, task_id: int):
    data = dict()
    return render(request, f'homework/html/hw{task_id}.html', data)


def js_task(request, task_id: int):
    data = dict()
    data['task_id'] = task_id
    with open(path.join(BASE_DIR, f"tasks/js_homework/homework{task_id}/readme.md")) as f:
        data['task_definition'] = f.read().replace('`', '\\`').replace("'", "\'").replace('"', '\"')
    try:
        return render(request, f'homework/js/homework{task_id}/index.html', data)
    except TemplateDoesNotExist:
        return HttpResponse("Sorry, page is under construction")


def step_ham(request):
    return render(request, f'homework/step_projects/step_ham.html')


def advanced_html1(request):
    return render(request, f'homework/advanced/html1.html')
