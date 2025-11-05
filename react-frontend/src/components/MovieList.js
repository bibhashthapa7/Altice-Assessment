import React, { useState, useEffect } from 'react';
import { getTrendingMovies } from '../services/api';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';
import './MovieList.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [timeWindow, setTimeWindow] = useState('week');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch movies when time window changes
    useEffect(() => {
        fetchMovies();
    }, [timeWindow]);

    // Fetch movies from API
    const fetchMovies = async () => {
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
    };

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
          
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onClick={(id) => navigate(`/movie/${id}`)} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;