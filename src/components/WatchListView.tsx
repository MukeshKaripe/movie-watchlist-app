// src/components/WatchlistView.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../src/redux/store/index';
import { removeFromWatchlist } from '../../src/redux/store/watchList';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';

const WatchlistView: React.FC = () => {
  const { listId } = useParams<{ listId: string}>();
  const dispatch = useDispatch();
  const watchlist = useSelector((state: RootState) => 
    state.watchlist.lists.find(list => list.id === listId)
  );

  if (!watchlist) {
    return <Typography>Watchlist not found</Typography>;
  }

  const handleRemoveMovie = (movieId: string) => {
    if (listId) {
      dispatch(removeFromWatchlist({ listId, movieId }));
    } else {
      console.error("listId is undefined");
      // Optionally, you can handle this case by showing a message or redirecting the user
    }
  };

  return (
    <Box>
      <Typography variant="h4">{watchlist.name}</Typography>
      <Grid container spacing={2}>
        {watchlist.movies.map(movie => (
          <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={movie.Poster}
                alt={movie.Title}
              />
              <CardContent>
                <Typography variant="h6">{movie.Title}</Typography>
                <Typography>{movie.Year}</Typography>
                <Button onClick={() => handleRemoveMovie(movie.imdbID)}>
                  Remove from Watchlist
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WatchlistView;