from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.http.response import HttpResponse
from django.views import View
from .models import *
from .serializers import *
from datetime import datetime, timedelta


class HomeView(View):

    def get(self, request):
        return HttpResponse('<h1>Hello World</h1>')
    

class NotificationAPIView(APIView):
    def get(self, request):
        last_two_videos = VideoModel.objects.all().order_by('-date')[:2]
        last_two_events = EventModel.objects.all().order_by('-date')[:2]
        last_events = NotificationModel.objects.all().order_by('-date')[:1]
        
        video_serializer = VideoSerializer(last_two_videos, many=True)
        event_serializer = EventSerializer(last_two_events, many=True)
        notification_serializer = NotificationSerializer(last_events, many=True)
        
        return Response({
            'last_two_videos': video_serializer.data,
            'last_two_events': event_serializer.data,
            'last_events': notification_serializer.data
        })

class EventList(APIView):
    def get(self, request, *args, **kwargs):
        duration = request.GET.get('duration', 'all')

        if duration == '1h':
            start_time = datetime.now() - timedelta(hours=1)
        elif duration == '1d':
            start_time = datetime.now() - timedelta(days=1)
        elif duration == '1w':
            start_time = datetime.now() - timedelta(weeks=1)
        elif duration == '1m':
            start_time = datetime.now() - timedelta(weeks=4)
        elif duration == '1y':
            start_time = datetime.now() - timedelta(weeks=52)
        else:
            start_time = None

        if start_time:
            events = EventModel.objects.filter(date__gte=start_time).order_by('-date')
        else:
            events = EventModel.objects.all().order_by('-date')

        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(events, request)
        serializer = EventSerializer(result_page, many=True)  # Assuming EventSerializer is defined

        return paginator.get_paginated_response(serializer.data)
    
class VideoList(APIView):
    def get(self, request, *args, **kwargs):
        duration = request.GET.get('duration', 'all')

        if duration == '1h':
            start_time = datetime.now() - timedelta(hours=1)
        elif duration == '1d':
            start_time = datetime.now() - timedelta(days=1)
        elif duration == '1w':
            start_time = datetime.now() - timedelta(weeks=1)
        elif duration == '1m':
            start_time = datetime.now() - timedelta(weeks=4)
        elif duration == '1y':
            start_time = datetime.now() - timedelta(weeks=52)
        else:
            start_time = None

        if start_time:
            videos = VideoModel.objects.filter(date__gte=start_time).order_by('-date')
        else:
            videos = VideoModel.objects.all().order_by('-date')

        paginator = PageNumberPagination()
        paginator.page_size = 10  # Set the page size
        result_page = paginator.paginate_queryset(videos, request)
        serializer = VideoSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)
