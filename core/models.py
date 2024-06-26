from django.db import models
from datetime import datetime
import re

class NotificationModel(models.Model):
    live_link = models.CharField(max_length=100,blank=True)
    discription = models.TextField(max_length=200,blank=True)
    date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.discription
    
class VideoModel(models.Model):
    youtube_link = models.CharField(max_length=100,blank=True)
    discription = models.TextField(max_length=200,blank=True)
    date = models.DateTimeField(default=datetime.now)

    def get_video_id(self):
        match = re.match(r'^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*', self.youtube_link)
        if match:
            return match.group(1)
        return None
    def __str__(self):
        return self.discription

class EventModel(models.Model):
    image = models.ImageField(blank=True)
    discription = models.TextField(max_length=200,blank=True)
    date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.discription