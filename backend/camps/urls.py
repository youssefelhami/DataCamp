from django.urls import path, include
from camps.views import CampView, CampsView, RatingView

urlpatterns = [
    path('camps/', CampsView.as_view()),
    path('camp/<int:pk>/', CampView.as_view()),
    path('ratings/', RatingView.as_view()),
]