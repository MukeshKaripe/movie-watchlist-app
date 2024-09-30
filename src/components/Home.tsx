// src/components/Home.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchMovies, Movie } from '../services/api';
import MovieCard from './MovieCard';
import SideBar from './SideBar';
import { makeStyles } from '@mui/styles';
import { RootState } from '../redux/store/index';
import { setMovies, setLoading } from '../redux/store/movieSlice';
import { addToWatchlist, removeFromWatchlist } from '../redux/store/watchList';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'flex',
  },
  sidebar: {
    width: '200px',
    height: '100vh',
    position: 'absolute',
    left: '0',
  },
  containerwrapper: {
    marginLeft: '200px',
    width: 'calc( 100% - 200px)',
  },
});

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const watchlist = useSelector((state: RootState) => state.watchlist.items);

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        dispatch(setLoading(true));
        const results = await searchMovies(query);
        dispatch(setMovies(results));
        console.log('Search Results:', results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      console.warn('Search query is empty');
    }
  };

  const handleAddToWatchlist = (movie: Movie) => {
    dispatch(addToWatchlist(movie));
  };

  const handleRemoveFromWatchlist = (movieId: string) => {
    dispatch(removeFromWatchlist(movieId));
  };

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <SideBar />
      </div>
      <div className={classes.containerwrapper}>
        <h1>Movie Search</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button onClick={handleSearch}>Search</button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="movie-list">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard 
                  key={movie.imdbID} 
                  movie={movie}
                  isInWatchlist={watchlist.some(item => item.imdbID === movie.imdbID)}
                  onAddToWatchlist={() => handleAddToWatchlist(movie)}
                  onRemoveFromWatchlist={() => handleRemoveFromWatchlist(movie.imdbID)}
                />
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;