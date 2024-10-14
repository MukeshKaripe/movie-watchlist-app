import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../src/redux/store/index';
import { removeFromWatchlist, updateWatchlistName } from '../../src/redux/store/watchList';
import { Box, Typography, Grid, Tooltip, Dialog, DialogTitle, DialogContent, Input, DialogActions, Button } from '@mui/material';
import { FiEdit } from "react-icons/fi";
import { useSharedStyles } from '../common/SharedStyles';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { FaCheck } from "react-icons/fa";
import { bgColors } from '../utils/colorTheme';
import { FaMinusCircle } from "react-icons/fa";

const WatchlistView: React.FC = () => {
  const classes = useSharedStyles();
  // const [isWatched, setIsWatched] = useState<any[]>([]);
  const isWatched: any[] = []
  const [hovered, setHovered] = useState(false);
  const { listId } = useParams<{ listId: string }>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const dispatch = useDispatch();
  const watchlist = useSelector((state: RootState) =>
    state.watchlist.lists.find(list => list.id === listId)
  );
  React.useEffect(() => {
    if (watchlist) {
      setNewName(watchlist.name);
    }
  }, [watchlist]);

  if (!watchlist) {
    return <Typography>Watchlist not found</Typography>;
  }
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewName(watchlist.name);
  };

  const handleUpdateName = () => {
    if (newName.trim() !== '') {
      dispatch(updateWatchlistName({ listId: watchlist.id, newName: newName.trim() }));
      setIsDialogOpen(false);
    }
  };
  const handleRemoveMovie = (movieId: string) => {
    if (listId) {
      dispatch(removeFromWatchlist({ listId, movieId }));
    } else {
      console.error("listId is undefined");
      // Optionally, you can handle this case by showing a message or redirecting the user
    }
  };
  const handleWatchedToggle = (movieId: String) => {
    isWatched.push(movieId)
  };

  console.log(hovered)
  return (
    <Box>
      <Typography variant="h4">{watchlist.name} <FiEdit className={classes.editIcon} onClick={handleOpenDialog} /> </Typography>
      <Typography variant="h6">About this watchlist</Typography>
      <Typography className={classes.textlorep} variant="h6">This list Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor totam hic praesentium numquam obcaecati, laudantium atque beatae quo esse dolorem consectetur debitis, placeat quibusdam culpa doloribus soluta officia asperiores sequi.</Typography>
      <Grid container spacing={2} columns={15}>
        {watchlist.movies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={3} key={movie.imdbID}>
            <Box className={classes.cardWrapper} onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}>
              <Box className={classes.imageMainWrapper}>
                <img className={classes.imageWrapper} src={movie.Poster} alt={movie.Title} />
              </Box>
              <Box className={classes.cardBlock}>
                <Typography variant='h6' className={`${classes.reactionWrapper} ${classes.posterTitle}`} > <AddReactionIcon className={classes.svgEmojiPosition} /> 86<sup style={{ fontSize: '12px', position: 'relative', top: '0px' }}>/100</sup></Typography>
                <Typography variant='h6' className={classes.posterTitle}>{movie.Title}</Typography>
                <Typography className={classes.posterYear} >[{movie.Year}]</Typography>
                <Tooltip
                  title={isWatched.includes(movie?.imdbID) ? "Mark as unwatched" : "Mark as watched"}
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
                  <Box className={classes.actionsIconWacthed} >
                    <FaCheck onClick={() => handleWatchedToggle(movie.imdbID)} style={{ fill: (isWatched.includes(movie?.imdbID)) ? `${bgColors.green}` : `${bgColors.white}` }} className={classes.actionsIconWacthedSvg} />
                  </Box>
                </Tooltip>
                <Tooltip
                  title={"Remove from watchlist"}
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
                  <Box className={classes.actionsIcon} onClick={() => handleRemoveMovie(movie.imdbID)}>
                    <FaMinusCircle className={classes.actionsIconWacthedSvg} />
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Watchlist Name</DialogTitle>
        <DialogContent>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateName}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WatchlistView;