import React from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from './MovieCard';
import { Movie } from '../services/api';
import { ThreeDots } from 'react-loader-spinner';

interface MovieSearchProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
  loading: boolean;
  movies: Movie[];
}

const MovieSearch: React.FC<MovieSearchProps> = ({
  query,
  setQuery,
  handleSearch,
  loading,
  movies,
}) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Movie Search</Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ ml: 1 }}>
          Search
        </Button>
      </Box>
      
      {loading ? (
        <Box display="flex" justifyContent="center">
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
              <MovieCard  movie={movie} isInWatchlist={false} onAddToWatchlist={function (): void {
                      throw new Error('Function not implemented.');
                  } } onRemoveFromWatchlist={function (): void {
                      throw new Error('Function not implemented.');
                  } } />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MovieSearch;