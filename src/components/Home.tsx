import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovies, Movie } from '../services/api';
import MovieCard from './MovieCard';
import SideBar from './SideBar';
import { makeStyles } from '@mui/styles';
import { bgColors } from '../utils/colorTheme';
import { Outlet } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        position:'relative',
        display:'flex'
    },
   sidebar:{
    width:'200px',
    height:'100vh',
    position:'absolute',
    left:'0',
   },
   containerwrapper:{
    marginLeft:'200px',
    width:'calc( 100% - 200px)'
   }
});

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const classes = useStyles();
//   const dispatch = useDispatch();

//   const handleSearch = async () => {
//     const results = await searchMovies(query);
//     setMovies(results);
//   };

  return (
    <div className={classes.container} >
        <div className={classes.sidebar} >
      <SideBar/>
        </div>
     <div className={classes.containerwrapper} >
     {/* <Outlet /> */}
     <MovieCard/>
     <h1>Movie Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
      />
      {/* <button onClick={handleSearch}>Search</button> */}
      <div className="movie-list">
        {/* {movies.map((movie) => (
          <MovieCard key={movie.imdbID}  />
        //   movie={movie}
        
        ))} */}
    
      </div>
     </div>
    </div>
  );
};

export default Home;