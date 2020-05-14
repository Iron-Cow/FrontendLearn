from django.shortcuts import render
from os import listdir, path
from FrontendLearn.settings import BASE_DIR



def get_task_range(kind: str = 'html'):

    return range(1, len(listdir(f'templates/homework/{kind}'))+1)


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
        data['task_definition'] = f.read().replace('`', '||')

    return render(request, f'homework/js/homework{task_id}/index.html', data)


