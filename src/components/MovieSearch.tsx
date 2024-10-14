import React from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from './MovieCard';
import { Movie } from '../services/api';
import LoadingComponent from '../common/Loader';
import { makeStyles } from '@mui/styles';
import { bgColors } from '../utils/colorTheme';
import watchList from '../assets/img/bookmark.png';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

interface MovieSearchProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
  loading: boolean;
  movies: Movie[];
}
const useStyles = makeStyles({
  appLoaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBlock: {
    display: 'flex',
    '@media (max-width: 768px)': {
      flexWrap: 'wrap !important',
  },
  },
  containerWrapper: {
    padding: '10px',
    borderRadius: '4px',
    border: `1px solid ${bgColors.red}`,
  },
  title: {
    color: bgColors.red1
  },
  searchContainer: {
    position: 'relative',
  },
  searchButtonContainer: {
    right: '0px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  searchButton: {
    backgroundColor: `${bgColors.red1} !important`,
    padding: '8px 16px !important'
  },
  sadEmoji:{
    width:'50px !important',
    height:'50px !important',
    fill: `${bgColors.red1} !important`,
    paddingTop: '20px',
    marginBottom: '-17px'
  }
});

const MovieSearch: React.FC<MovieSearchProps> = ({
  query,
  setQuery,
  handleSearch,
  loading,
  movies,
}) => {
  const classes = useStyles();
  
  return (
    <Box>
      <Box className={classes.containerWrapper} sx={{ marginBottom: { xs: "10px", sm: "20px", md: "30px", lg: "40px" } }} >
        <Typography gap={2} className={classes.containerBlock} variant="h3" gutterBottom>Welcome to <Typography variant="h3" className={classes.title}>Watchlists</Typography> </Typography>
        <Typography variant="h6">Browse movies,add them to watchlists and share them with friends.</Typography>
        <Typography variant="h6">Just click the <img width={20} height={20} src={watchList} alt='Bookmark'  ></img> to add a movie the poster to see more details and to mark the movie as watched. </Typography>
      </Box>
      <Box mb={3} className={classes.searchContainer} >
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          InputProps={{
            startAdornment: <SearchIcon />,
            inputProps: {
              style: {padding: '10px 100px 10px 16px'}
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: `${bgColors.red1}`
              },
            },
          }}
        />
        <Box className={classes.searchButtonContainer} position="absolute">
          <Button className={classes.searchButton} variant="contained" onClick={handleSearch} sx={{ ml: 1 }}>
            Search
          </Button>
        </Box>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <LoadingComponent color="#00BFFF" height={'80px'} />
        </Box>
      ) : movies.length === 0 ? (
        <Box display="flex" justifyContent="center" p={4}>
          <Typography variant="h6" color="text.secondary">
            No movies found <SentimentVeryDissatisfiedIcon className={classes.sadEmoji} />. Try a different search term.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2} columns={15} >
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.imdbID}>
              <MovieCard movie={movie} isInWatchlist={false} onAddToWatchlist={function (): void {
                throw new Error('Function not implemented.');
              }} onRemoveFromWatchlist={function (): void {
                throw new Error('Function not implemented.');
              }} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MovieSearch;