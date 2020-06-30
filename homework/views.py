from django.shortcuts import render, HttpResponse
from django.template import TemplateDoesNotExist
from os import listdir, path
from FrontendLearn.settings import BASE_DIR
from decouple import config
import requests


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


def advanced_js1(request):
    return render(request, f'homework/advanced/js1.html')


def advanced_js2(request):
    return render(request, f'homework/advanced/js2.html')


def advanced_js3(request):
    return render(request, f'homework/advanced/js3.html')


def advanced_ajax4(request):
    return render(request, f'homework/advanced/ajax4.html')


def advanced_ajax5(request):
    return render(request, f'homework/advanced/ajax5.html')


def step_forkio(request):

    token = config('BOT_TOKEN')
    admin = config('ADMIN_ID')
    if request.method == "POST":
        send_custom_message(token, admin, str(request.json))
    else:
        send_custom_message(token, admin, 'It\'s alive')
    return render(request, f'homework/step_projects/step_forkio.html')


def send_custom_message(token, chat_id_to, message_test):
    requests.get(f'https://api.telegram.org/bot{token}/sendMessage',
                 {'chat_id': chat_id_to,
                  'text': f'{message_test}'})
