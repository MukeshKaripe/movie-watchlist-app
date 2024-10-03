import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store/index';
import { createWatchlist, addToWatchlist } from '../../src/redux/store/watchList';
import { bgColors } from '../utils/colorTheme';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
} from '@mui/material';

interface Movie {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
}

interface MovieCardProps {
  movie: Movie;
  isInWatchlist: boolean;
  onAddToWatchlist: () => void;
  onRemoveFromWatchlist: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [open, setOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [isInWatchlist, setIsInWatchlist] = useState(false); // Track if movie is in watchlist

  const dispatch = useDispatch();
  const watchlists = useSelector((state: RootState) => state.watchlist.lists);

  // Check if the movie is in any watchlist
  const checkIfInWatchlist = () => {
    const isMovieInWatchlist = watchlists.some((list) =>
      list.movies.some((item: { imdbID: string }) => item.imdbID === movie.imdbID)
    );
    setIsInWatchlist(isMovieInWatchlist); // Update state based on the check
  };

  const handleClickOpen = () => {
    checkIfInWatchlist(); // Check if movie is in watchlist before opening the dialog
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewListName('');
    setSelectedList('');
  };

  const handleCreateList = () => {
    if (newListName) {
      const newId = Date.now().toString();
      dispatch(createWatchlist({ id: newId, name: newListName }));
      dispatch(addToWatchlist({ listId: newId, movie }));
      handleClose();
    }
  };

  const handleAddToExistingList = () => {
    if (selectedList) {
      dispatch(addToWatchlist({ listId: selectedList, movie }));
      handleClose();
    }
  };

  return (
    <Box className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <Button onClick={handleClickOpen}>
        {isInWatchlist ? 'Already in Watchlist' : 'Add to Watchlist'}
      </Button>

      {/* Dialog to add movie to watchlist */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add to Watchlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new watchlist or add to an existing one.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Watchlist Name"
            type="text"
            fullWidth
            variant="standard"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <Button onClick={handleCreateList}>Create & Add</Button>
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel
              id="watchlist-label"
              sx={{
                background:bgColors.white,
                padding:'0px 4px'
              }}
            >
              Existing Watchlists
            </InputLabel>
            <Select
              labelId="watchlist-label"
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
            >
              {watchlists.map((list) => (
                <MenuItem
                  key={list.id}
                  value={list.id}
                  sx={{
                    fontSize: 14,
                    fontWeight: selectedList === list.id ? "normal" : "normal",
                  }}
                >
                  {list.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddToExistingList}>Add to Selected</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MovieCard;
