import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store/index';
import { createWatchlist, addToWatchlist } from '../../src/redux/store/watchList';
import { bgColors } from '../utils/colorTheme';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import watchList from '../assets/img/bookmark.png';
import removeIcon from '../assets/img/remove.png';
import { useSharedStyles } from './SharedStyles';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

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
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

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
  const classes = useSharedStyles();
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
    if (isMovieInAnyWatchlist()) {
      toast.error('This movie is already in a watchlist');
      return;
    }
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
      toast.success(`${movie.Title} Movie added to Watchlist Succefully`);
      handleClose();
    }
  };
 //selected movie
 const isMovieInAnyWatchlist = () => {
  return watchlists.some(list => 
    list.movies && list.movies.some(m => m.imdbID === movie.imdbID)
  );
};
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 6 }}>
      <Grid item xs={12} className={classes.gridWrapper}  >
        <Box className={classes.cardWrapper}>
          <Box className={classes.imageMainWrapper}>
            <img className={classes.imageWrapper} src={movie.Poster} alt={movie.Title} />
          </Box>
          <Box className={classes.cardBlock}>
            <Typography variant='h6' className={`${classes.reactionWrapper} ${classes.posterTitle}`} > <AddReactionIcon className={classes.svgEmojiPosition} /> 86<sup style={{ fontSize: '12px', position: 'relative', top: '0px' }}>/100</sup></Typography>
            <Typography variant='h6' className={classes.posterTitle}>{movie.Title}</Typography>
            <Typography className={classes.posterYear} >[{movie.Year}]</Typography>
            {/* <Button onClick={handleClickOpen}>
              {isInWatchlist ? 'Already in Watchlist' : 'Add to Watchlist'}
            </Button> */}
            <img className={classes.actionsIcon} width={30} height={30}
              src={isInWatchlist ? removeIcon : watchList}
              alt={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              onClick={handleClickOpen} />
          </Box>
        </Box>
      </Grid>
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
                background: bgColors.white,
                padding: '0px 4px'
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Grid>
  );
};

export default MovieCard;
