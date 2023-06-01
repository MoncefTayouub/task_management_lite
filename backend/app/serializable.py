from dataclasses import fields
from rest_framework import serializers
from .models import *



class projectSER(serializers.ModelSerializer):
    class Meta :
        fields = '__all__'
        model = project 

class taskSER(serializers.ModelSerializer):
    class Meta :
        fields = '__all__'
        model = task 


class stepsSER(serializers.ModelSerializer):
    class Meta :
        fields = '__all__'
        model = steps 
