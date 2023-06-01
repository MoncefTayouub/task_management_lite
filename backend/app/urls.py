from django.urls import path 
from . import views 


urlpatterns = [
    path('project', views.project_queries ) ,
    path('task/<int:id>', views.tasks_queries ) ,
    path('steps', views.steps_queries ) ,
] 