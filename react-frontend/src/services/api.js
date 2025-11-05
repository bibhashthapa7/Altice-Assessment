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

// Get favorites from localStorage
export const getFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

// Add favorite to localStorage
export const addFavorite = (movieId) => {
    const favorites = getFavorites();
    if (!favorites.includes(movieId)) {
        favorites.push(movieId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

// Remove favorite from localStorage
export const removeFavorite = (movieId) => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(id => id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
}

// Check if movie is a favorite
export const isFavorite = (movieId) => {
    const favorites = getFavorites();
    return favorites.includes(movieId);
}
