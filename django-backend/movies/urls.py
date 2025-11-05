from django.urls import path
from . import views

urlpatterns = [
    path('trending/<str:time_window>/', views.get_trending_movies, name='trending-movies'),
    path('movie/<int:movie_id>/', views.get_movie_details, name='movie-details'),
]