from django.test import TestCase
from django.urls import reverse
from unittest.mock import patch, Mock
from rest_framework.test import APIClient
from rest_framework import status
import requests


class MovieViewsTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.mock_movie_data = {
            'results': [
                {'id': 1, 'title': 'Test Movie', 'poster_path': '/test.jpg'}
            ]
        }
        self.mock_movie_detail = {
            'id': 1,
            'title': 'Test Movie',
            'overview': 'Test overview',
            'poster_path': '/test.jpg'
        }

    @patch('movies.views.requests.get')
    def test_get_trending_movies_success(self, mock_get):
        """Test successful trending movies fetch"""
        mock_response = Mock()
        mock_response.json.return_value = self.mock_movie_data
        mock_response.raise_for_status = Mock()
        mock_get.return_value = mock_response

        url = reverse('trending-movies', kwargs={'time_window': 'day'})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, self.mock_movie_data)

    @patch('movies.views.requests.get')
    def test_get_trending_movies_error(self, mock_get):
        """Test error handling for trending movies"""
        mock_get.side_effect = requests.exceptions.RequestException('API Error')

        url = reverse('trending-movies', kwargs={'time_window': 'day'})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn('error', response.data)

    @patch('movies.views.requests.get')
    def test_get_movie_details_success(self, mock_get):
        """Test successful movie details fetch"""
        mock_response = Mock()
        mock_response.json.return_value = self.mock_movie_detail
        mock_response.raise_for_status = Mock()
        mock_get.return_value = mock_response

        url = reverse('movie-details', kwargs={'movie_id': 1})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Movie')

    @patch('movies.views.requests.get')
    def test_get_movie_details_error(self, mock_get):
        """Test error handling for movie details"""
        mock_get.side_effect = requests.exceptions.RequestException('API Error')

        url = reverse('movie-details', kwargs={'movie_id': 1})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn('error', response.data)