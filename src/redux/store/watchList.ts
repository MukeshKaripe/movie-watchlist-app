// src/store/watchlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../services/api';

interface Watchlist {
  id: string;
  name: string;
  movies: Movie[];
}

interface WatchlistState {
  lists: Watchlist[];
}

const initialState: WatchlistState = {
  lists: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    createWatchlist: (state, action: PayloadAction<{ id: string; name: string }>) => {
      // state.lists.push({ id: action.payload.id, name: action.payload.name, movies: [] });
      const isDuplicate = state.lists.some(list => list.name === action.payload.name);
      if (!isDuplicate) {
        state.lists.push({ id: action.payload.id, name: action.payload.name, movies: [] });
      }
    },
    updateWatchlistName: (state, action: PayloadAction<{ listId: string; newName: string }>) => {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (list) {
        list.name = action.payload.newName;
      }
    },
    addToWatchlist: (state, action: PayloadAction<{ listId: string; movie: Movie }>) => {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (list && !list.movies.some(m => m.imdbID === action.payload.movie.imdbID)) {
        list.movies.push(action.payload.movie);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<{ listId: string; movieId: string }>) => {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (list) {
        list.movies = list.movies.filter(movie => movie.imdbID !== action.payload.movieId);
      }
    },
  },
});

export const { createWatchlist, addToWatchlist, removeFromWatchlist, updateWatchlistName } = watchlistSlice.actions;
export default watchlistSlice.reducer;