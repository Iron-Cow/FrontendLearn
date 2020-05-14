from django.urls import path
from .views import index, html_task, js_task

urlpatterns = [
    path('', index, name='homeworks'),
    path('html/<int:task_id>', html_task, name='html_task'),
    path('js/<int:task_id>', js_task, name='js_task'),
]
