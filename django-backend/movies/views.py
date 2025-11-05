from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import requests

TMDB_API_KEY = settings.TMDB_API_KEY
TMDB_BASE_URL = settings.TMDB_BASE_URL

@api_view(['GET'])
def get_trending_movies(request, time_window):
    """
    Get trending movies from TMDB API
    time_window: 'day' or 'week'
    """
    try:
        url = f"{TMDB_BASE_URL}/trending/movie/{time_window}"
        params = {
            'api_key': TMDB_API_KEY,
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        return Response(response.json(), status=status.HTTP_200_OK)
    except requests.exceptions.RequestException as e:
        return Response(
            {'error': 'Failed to fetch movies from TMBD'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

@api_view(['GET'])
def get_movie_details(request, movie_id):
    """
    Get details of a movie from TMDB API
    movie_id: The ID of the movie
    """
    try:
        url = f"{TMDB_BASE_URL}/movie/{movie_id}"
        params = {
            'api_key': TMDB_API_KEY,
        }

        response = requests.get(url, params=params)
        response.raise_for_status()
        return Response(response.json(), status=status.HTTP_200_OK)
    except requests.exceptions.RequestException as e:
        return Response(
            {'error': 'Failed to fetch movie details from TMBD'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
