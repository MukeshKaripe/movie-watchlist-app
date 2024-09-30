// src/components/MovieCard.tsx
import React from 'react';
import { Movie } from '../services/api';

interface MovieCardProps {
  movie: Movie;
  isInWatchlist: boolean;
  onAddToWatchlist: () => void;
  onRemoveFromWatchlist: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isInWatchlist, onAddToWatchlist, onRemoveFromWatchlist }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      {isInWatchlist ? (
        <button onClick={onRemoveFromWatchlist}>Remove from Watchlist</button>
      ) : (
        <button onClick={onAddToWatchlist}>Add to Watchlist</button>
      )}
    </div>
  );
};

export default MovieCard;