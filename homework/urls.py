from django.urls import path
from .views import index, html_task, js_task, step_ham, advanced_html1

urlpatterns = [
    path('', index, name='homeworks'),
    path('html/<int:task_id>', html_task, name='html_task'),
    path('js/<int:task_id>', js_task, name='js_task'),
    path('step/step_ham', step_ham, name='step_ham'),
    path('advanced/html1', advanced_html1, name='advanced_html1'),
]
