from django.shortcuts import render


from unicodedata import category
from django.shortcuts import render
from django.shortcuts import render
from .models import * 
from rest_framework.response import *
from rest_framework.decorators import api_view
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.renderers import * 
from django.core.files.images import ImageFile
from django.core.mail import *
from django.conf import settings
from django.contrib.auth import authenticate
import random
import string
from django.contrib.auth.models import User
from calendar import *
from .Manipulation import *
import json
from .serializable import * 
# Create your views here.
from datetime import * 

@api_view(['GET','POST','PUT','DELETE'])
def project_queries(request):    
     if request.method == 'POST' :
        project.objects.create(
            name = request.POST.get('name')
        ).save()
     if request.method == 'GET' : 
        projs = project.objects.all()
        pr_ser = projectSER(projs,many = True).data
        i = 0 
        for k in projs :
          total_steps = 0 
          done_steps = 0 
          tasks = task.objects.filter(parentProject= k )
          for s in tasks : 
               total_steps += steps.objects.filter(parentTask=s).count()
               done_steps += steps.objects.filter(parentTask=s , done = True).count()
          pr_ser[i]['done'] = done_steps
          pr_ser[i]['total'] = total_steps

          i += 1 
             
        return Response(
            pr_ser
        )
     if request.method == 'PUT' :
          rq = project.objects.get(id = request.POST.get('id'))
          rq.name = request.POST.get('name')
          rq.save()
     if request.method == 'DELETE' : 
          project.objects.get(id = request.POST.get('id')).delete()
     return Response('you are home')


@api_view(['GET','POST','PUT','DELETE'])
def tasks_queries(request , id ):   
        if request.method == 'GET' : 
          proj = project.objects.get(id = id )
          tasks = task.objects.filter(parentProject = proj)
          proj_data = projectSER(proj ).data
          proj_data['tasks'] =  taskSER(tasks,many=True).data
          count = 0 
          for s in proj_data['tasks'] :
               curr_task = tasks[count]
               curr_steps = steps.objects.filter(parentTask = curr_task)
               s['step'] = stepsSER(curr_steps,many=True).data
               s['total_steps'] = curr_steps.count()
               s['total_done'] = steps.objects.filter(parentTask = curr_task,done = True).count()
               count += 1 
          
                  
          return Response( 
               proj_data
               )
        if request.method == 'POST' : 
             rq = task.objects.create(
                  parentProject = project.objects.get(id = id) ,
                  name = request.POST.get('name') ,
                  DDL = request.POST.get('DDL') ,
             )
             rq.save()
             return Response(rq.id)
        if request.method == 'PUT' : 
            rq = task.objects.get(id = request.POST.get('id'))
            rq.name = request.POST.get('name')
            rq.DDL = request.POST.get('DDL')
            rq.save()
            return Response(rq.id)
        if request.method == 'DELETE' : 
               task.objects.get(id = request.POST.get('id')).delete()
        
        return Response()   

@api_view(['GET','POST','PUT','OPTIONS','DELETE'])
def steps_queries(request): 
     if request.method == 'POST' : 
          steps.objects.create(
               parentTask = task.objects.get(id=request.POST.get('id')) ,
               name = request.POST.get('name')
          ).save()
     if request.method == 'PUT' : 
          rq = steps.objects.get(id = request.POST.get('id'))
          rq.name = request.POST.get('name')
          rq.save()
     if request.method == 'OPTIONS':
          rq = steps.objects.get(id = request.POST.get('id'))
          if request.POST.get('done') == 'true' :
               rq.done = True
          else :
               rq.done = False
                
          rq.save()
     if request.method == 'DELETE' : 
          steps.objects.get(id = request.POST.get('id')).delete()


          
     return Response()    