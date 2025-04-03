import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store/index';
import { createWatchlist, addToWatchlist } from '../../src/redux/store/watchList';
import { bgColors } from '../utils/colorTheme';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import watchList from '../assets/img/brp.png';
import watchListPlus from '../assets/img/plus-sign-icon-free-png.webp';
import { Tooltip } from '@mui/material';
import { useSharedStyles } from '../common/SharedStyles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Movie } from '../services/api';


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
  Typography,
} from '@mui/material';
import MovieDetail from './MovieDetail';



interface MovieCardProps {
  movie: Movie;
  isInWatchlist: boolean;
  onAddToWatchlist: () => void;
  onRemoveFromWatchlist: () => void;
}


const MovieCard: React.FC<MovieCardProps> = ({ movie,
  onAddToWatchlist,
  onRemoveFromWatchlist, }) => {
  const classes = useSharedStyles();
  const [hovered, setHovered] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const existingWatchlists = useSelector((state: RootState) => state.watchlist.lists);
  const [selectedList, setSelectedList] = useState('');
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const watchlists = useSelector((state: RootState) => state.watchlist.lists);
  // Check if the movie is in any watchlist
  const checkIfInWatchlist = () => {
    const isMovieInWatchlist = watchlists.some((list) =>
      list.movies.some((item: { imdbID: string }) => item.imdbID === movie.imdbID)
    );
    setIsInWatchlist(isMovieInWatchlist); // Update state based on the check
  };
  const handleOpenDetail = () => {
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };
  const handleClickOpen = () => {
    checkIfInWatchlist(); // Check if movie is in watchlist before opening the dialog
    // setOpen(true);
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsModalOpen(false);
    setNewListName('');
    setSelectedList('');
  };
  const handleCreateList = () => {
    const trimmedName = newListName.trim();
    // Check if name is empty
    if (!trimmedName) {
      setTimeout(() => {
        toast.error('Please enter a watchlist name');
      }, 0);
      return;
    }
    // Check if watchlist name already exists (case insensitive)
    const isExisting = existingWatchlists.some(
      list => list.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (isExisting) {
      setTimeout(() => {
        toast.error(`Watchlist "${trimmedName}" already exists`);
      }, 0);
      return;
    }
    const newId = Date.now().toString();
    dispatch(createWatchlist({ id: newId, name: newListName }));
    dispatch(addToWatchlist({ listId: newId, movie }));
    setTimeout(() => {
      toast.success(`Watchlist "${trimmedName}" created successfully`);
    }, 0);
    handleClose();
  };
  const handleAddToExistingList = () => {
    if (selectedList) {
      dispatch(addToWatchlist({ listId: selectedList, movie }));
      setTimeout(() => {
        toast.success(`${movie.Title} Movie added to Watchlist Succefully`);
      }, 0);
      handleClose();
    }
  };
  const handleAddToWatchlist = (movie: Movie) => {
    // For now, adding to the first watchlist if available
    if (watchlists.length > 0) {
      dispatch(addToWatchlist({
        listId: watchlists[0].id,
        movie
      }));
    }
  };
  useEffect(() => {
    if (open && isInWatchlist) {
      open && setOpen(open);
      isInWatchlist && setIsInWatchlist(isInWatchlist);
    }
  }, [isInWatchlist, open])
  return (
    <Box>
      <Box className={classes.cardWrapper}>
        <Box className={classes.imageMainWrapper}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleOpenDetail}>
          <img className={classes.imageWrapper} src={movie.Poster} alt={movie.Title} />
        </Box>
        <Box className={classes.cardBlock}>
          <Typography variant='h6' className={`${classes.reactionWrapper} ${classes.posterTitle}`} > <AddReactionIcon className={classes.svgEmojiPosition} /> 86<sup style={{ fontSize: '12px', position: 'relative', top: '0px' }}>/100</sup></Typography>
          <Typography variant='h6' className={classes.posterTitle}>{movie.Title}</Typography>
          <Typography className={classes.posterYear} >[{movie.Year}]</Typography>
          <Tooltip
            title={"Add to Watchlist"}
            placement="top"
            arrow
            enterDelay={500}
            leaveDelay={200}
            sx={{
              '& .MuiTooltip-tooltip': {
                backgroundColor: 'rgba(0, 0, 0, 0.87)',
                padding: '8px 12px',
                fontSize: '14px'
              }
            }}
          >
            <Box className={classes.actionsIcon}>
              <img width={30} height={30}
                src={watchList}
                alt={"Add to Watchlist"}
                onClick={handleClickOpen} />
              <img className={classes.actionsIconSub} width={15} height={15}
                src={watchListPlus}
                alt={"Add to Watchlist"}
                onClick={handleClickOpen} />
            </Box>
          </Tooltip>
        </Box>
      </Box>
      {/* Dialog to add movie to watchlist */}
      <Dialog sx={{ '& .MuiDialog-paperScrollPaper': { minWidth: { xs: '200px', md: '410px' } } }} open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
          <Button className={classes.createAdd} onClick={handleCreateList}>Create & Add</Button>
          <hr></hr>
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
              displayEmpty
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
          <Button sx={{ color: bgColors.gray1 }} onClick={handleClose}>Cancel</Button>
          <Button disabled={!selectedList} onClick={handleAddToExistingList} sx={{
            backgroundColor: selectedList ? bgColors.blue : bgColors.gray1,
            color: bgColors.white,
            '&.Mui-disabled': {
              pointerEvents: 'auto',
              cursor: 'not-allowed',
              backgroundColor: bgColors.gray2,
            },
          }} >Add to Selected</Button>
        </DialogActions>
      </Dialog>
      <MovieDetail
        movieId={movie.imdbID}
        open={openDetail}
        onClose={handleCloseDetail}
        onAddToWatchlist={handleAddToWatchlist}
      />
    </Box>
  );
};

export default MovieCard;
