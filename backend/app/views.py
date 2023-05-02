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

@api_view(['GET'])
def home(request):    
       
    return Response('you are home')