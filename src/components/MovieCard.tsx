import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store/index';
import { addToWatchlist } from '../../src/redux/store/watchList';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import watchList from '../assets/img/brp.png';
import watchListPlus from '../assets/img/plus-sign-icon-free-png.webp';
import { Tooltip } from '@mui/material';
import { useSharedStyles } from '../common/SharedStyles';
import 'react-toastify/dist/ReactToastify.css';
import { Movie } from '../services/api';
import {
  Box,
  Typography,
} from '@mui/material';
import MovieDetail from './MovieDetail';
import WatchlistDialog from './watchlistDailogModule';



interface MovieCardProps {
  movie: Movie;
  isInWatchlist: boolean;
  onAddToWatchlist: () => void;
  onRemoveFromWatchlist: () => void;
}


const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const classes = useSharedStyles();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hovered, setHovered] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const watchlists = useSelector((state: RootState) => state.watchlist.lists);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState<Movie | null>(null);
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
    checkIfInWatchlist(); // Check if the movie is already in the watchlist
    setSelectedMovieDetails(movie); // ✅ Store the selected movie before opening the modal
    setIsModalOpen(true);
    setIsModalOpen(true);
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
      <WatchlistDialog open={isModalOpen} onClose={() => setIsModalOpen(false)} selectedMovie={selectedMovieDetails} />
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
