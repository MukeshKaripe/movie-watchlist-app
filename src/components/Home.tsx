// src/components/Home.tsx
import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchMovies } from '../services/api';
import SideBar from './SideBar';
import { makeStyles } from '@mui/styles';
import { RootState } from '../../src/redux/store/index';
import { setMovies, setLoading } from '../../src/redux/store/movieSlice';
import { Box } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import WatchlistView from './WatchListView';
import MovieSearch from './MovieSearch';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

const useStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'flex',
  },
  sidebar: {
    width: '250px',
    height: '100vh',
    position: 'fixed',
    left: '0',
    '@media (max-width: 767px)': {
      // display: 'none !important'
    }
  },
  containerwrapper: {
    marginLeft: '250px',
    width: 'calc( 100% - 250px)',
    '@media (max-width: 767px)': {
      marginLeft: '0px',
      width: '100%',
  },
  },
  content: {
    marginLeft: '250px',
    width: 'calc(100% - 250px)',
    padding: '40px',
    '@media (max-width: 767px)': {
      marginLeft: '0px',
      width: '100%',
      padding: '20px',
      marginTop: '20px',
  },
  },
});

const Home: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        dispatch(setLoading(true));
        const results = await searchMovies(query);
        dispatch(setMovies(results));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const renderContent = () => {
    if (location.pathname === '/') {
      return (
        <MovieSearch
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          loading={loading}
          movies={movies}
        />
      );
    }
    return null;
  };
  return (
    <Box className={classes.container}>
      <Box className={classes.sidebar}>
        <ThemeProvider theme={theme}>
          <SideBar />
        </ThemeProvider>
      </Box>
      <Box className={classes.content}>
        <Routes>
          <Route path="/" element={renderContent()} />
          <Route path="/watchlist/:listId" element={<WatchlistView />} />
        </Routes>
      </Box>
    </Box>
  );
};


export default Home;