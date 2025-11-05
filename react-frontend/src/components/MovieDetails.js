import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import './MovieDetails.css';
import starIcon from '../assets/star.svg';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch movie details when component mounts or id changes
  useEffect(() => {
    getMovieDetails(id)
      .then(data => setMovie(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-details">
        <button onClick={() => navigate('/')}>Back</button>
        <div className="details">
            <img src={imageUrl} alt={movie.title} />
            <div>
                <h1>{movie.title}</h1>
                <p>
                    {movie.release_date} | {movie.runtime} min | 
                    <img src={starIcon} alt="star" className="star-icon" /> 
                    {movie.vote_average.toFixed(1)}
                </p>
                <p>{movie.overview}</p>
            </div>
        </div>
    </div>
    );
};

export default MovieDetails;