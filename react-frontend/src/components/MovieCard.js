import React from 'react';
import './MovieCard.css';
import starIcon from '../assets/star.svg';

const MovieCard = ({ movie, onClick }) => {
    // Construct image URL using TMDB API
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <div className="movie-card" onClick={() => onClick(movie.id)}>
            <img src={imageUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>
                <img src={starIcon} alt="star" className="star-icon" />
                {movie.vote_average.toFixed(1)}
            </p>
        </div>
        );
    };

export default MovieCard;