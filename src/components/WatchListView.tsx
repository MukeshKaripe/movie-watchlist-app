// src/components/WatchlistView.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../src/redux/store/index';
import { removeFromWatchlist } from '../../src/redux/store/watchList';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Tooltip } from '@mui/material';
import { FiEdit } from "react-icons/fi";
import { useSharedStyles } from './SharedStyles';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { FaCheck } from "react-icons/fa";
import { bgColors } from '../utils/colorTheme';
import watchListMinus from '../assets/img/minus-line.jpg';
import { FaMinusCircle } from "react-icons/fa";
import { Console } from 'console';

const WatchlistView: React.FC = () => {
  const classes = useSharedStyles();
  const [isWatched, setIsWatched] = useState<any[]>([]);
  const [hovered, setHovered] = useState(false);
  const { listId } = useParams<{ listId: string }>();
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
  const handleWatchedToggle = (movieId:String) => {
    isWatched.push(movieId)
  };
  console.log(isWatched)

  return (
    <Box>
      <Typography variant="h4">{watchlist.name} <FiEdit className={classes.editIcon} /> </Typography>
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
                  title={isWatched.includes(movie?.imdbID)? "Mark as unwatched" : "Mark as watched"}
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
                    <FaCheck onClick={()=>handleWatchedToggle(movie.imdbID)} style={{ fill: (isWatched.includes(movie?.imdbID)) ? `${bgColors.green}` : `${bgColors.white}` }} className={classes.actionsIconWacthedSvg} />
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
    </Box>
  );
};

export default WatchlistView;