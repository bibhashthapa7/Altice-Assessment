import axios from 'axios';

const API_URL = 'http://localhost:8000/api/movies/';

// Get trending movies (default to 'week' if no time window provided)
export const getTrendingMovies = async (timeWindow = 'week') => {
    try {
        const response = await axios.get(`${API_URL}trending/${timeWindow}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
};

// Get movie details
export const getMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${API_URL}movie/${movieId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};