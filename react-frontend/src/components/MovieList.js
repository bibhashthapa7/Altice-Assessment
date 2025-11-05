import React, { useState, useEffect, useCallback } from 'react';
import { getTrendingMovies, getMovieDetails, getFavorites } from '../services/api';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';
import './MovieList.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [timeWindow, setTimeWindow] = useState('week');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    // Fetch movies from API
    const fetchMovies = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getTrendingMovies(timeWindow);
            setMovies(data.results);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [timeWindow]);


    // Fetch favorite movies from localStorage
    const fetchFavoriteMovies = useCallback(async () => {
        try {
            const favoriteIds = getFavorites();
            const favoriteMovies = await Promise.all(favoriteIds.map(id => getMovieDetails(id)));
            setFavoriteMovies(favoriteMovies);
        } catch (error) {
            console.error('Error fetching favorite movies:', error);
        }
    }, []);

    // Fetch movies when time window changes
    useEffect(() => {
        fetchMovies();
        fetchFavoriteMovies();
    }, [fetchMovies, fetchFavoriteMovies]);

    // Refresh favorite movies when favorite changes
    useEffect(() => {
        const handleFavoriteChange = () => {
            fetchFavoriteMovies();
        };
        window.addEventListener('favorite-change', handleFavoriteChange);
        return () => {
            window.removeEventListener('favorite-change', handleFavoriteChange);
        };
    }, [fetchFavoriteMovies]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1 className="h1">Trending Movies</h1>
            <select value={timeWindow} onChange={(e) => setTimeWindow(e.target.value)}>
                <option value="day">Today</option>
                <option value="week">This Week</option>
            </select>

            {favoriteMovies.length > 0 && (
                <div className="favorites-section">
                <h2>My Favorites</h2>
                <div className="movies-grid">
                    {favoriteMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onClick={(id) => navigate(`/movie/${id}`)} />
                    ))}
                </div>
                </div>
            )}
          
            <h2> All Movies</h2>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onClick={(id) => navigate(`/movie/${id}`)} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;