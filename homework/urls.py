from django.urls import path
from .views import index, html_task, js_task, step_ham, advanced_html1, advanced_js1, advanced_js2, advanced_js3, \
    advanced_ajax4, advanced_ajax5, step_forkio


urlpatterns = [
    path('', index, name='homeworks'),
    path('html/<int:task_id>', html_task, name='html_task'),
    path('js/<int:task_id>', js_task, name='js_task'),
    path('step/step_ham', step_ham, name='step_ham'),
    path('advanced/html1', advanced_html1, name='advanced_html1'),
    path('advanced/js1', advanced_js1, name='advanced_js1'),
    path('advanced/js2', advanced_js2, name='advanced_js2'),
    path('advanced/js3', advanced_js3, name='advanced_js3'),
    path('advanced/ajax4', advanced_ajax4, name='advanced_ajax4'),
    path('advanced/ajax5', advanced_ajax5, name='advanced_ajax5'),
    path('step/step_forkio', step_forkio, name='step_forkio'),

]
