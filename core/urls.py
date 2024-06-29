from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('api/notifications/', NotificationAPIView.as_view(), name='notification-api'),
    path('api/events/', EventList.as_view(), name='event-list'),
    path('api/videos/', VideoList.as_view(), name='video-list'),
]
