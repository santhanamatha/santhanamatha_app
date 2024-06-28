from rest_framework import serializers
from .models import *


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationModel
        fields = ['live_link', 'discription', 'date']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventModel
        fields = ['id','image', 'discription', 'date']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoModel
        fields = ['id', 'youtube_link', 'discription', 'date']