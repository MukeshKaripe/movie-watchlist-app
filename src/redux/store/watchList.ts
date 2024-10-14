
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../services/api';

interface Watchlist {
  id: string;
  name: string;
  movies: Movie[];
}

interface WatchlistState {
  lists: Watchlist[];
  error: string | null;
}

const initialState: WatchlistState = {
  lists: [],
  error: null,
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    createWatchlist: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const isDuplicate = state.lists.some(list => list.name === action.payload.name);
      if (isDuplicate) {
        state.error = "A watchlist with this name already exists";
      } else {
        state.lists.push({ id: action.payload.id, name: action.payload.name, movies: [] });
        state.error = null;
      }
    },
    updateWatchlistName: (state, action: PayloadAction<{ listId: string; newName: string }>) => {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (list) {
        list.name = action.payload.newName;
        state.error = null;
      } else {
        state.error = "Watchlist not found";
      }
    },
    addToWatchlist: (state, action: PayloadAction<{ listId: string; movie: Movie }>) => {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (list) {
        if (!list.movies.some(m => m.imdbID === action.payload.movie.imdbID)) {
          list.movies.push(action.payload.movie);
          state.error = null;
        } else {
          state.error = "Movie already in watchlist";
        }
      } else {
        state.error = "Watchlist not found";
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<{ listId: string; movieId: string }>) => {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (list) {
        list.movies = list.movies.filter(movie => movie.imdbID !== action.payload.movieId);
        state.error = null;
      } else {
        state.error = "Watchlist not found";
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  createWatchlist, 
  addToWatchlist, 
  removeFromWatchlist, 
  updateWatchlistName,
  clearError
} = watchlistSlice.actions;

export default watchlistSlice.reducer;