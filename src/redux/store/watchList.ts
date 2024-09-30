import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../services/api';

interface WatchlistState {
  items: Movie[];
}

const initialState: WatchlistState = {
  items: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<Movie>) => {
      if (!state.items.some(movie => movie.imdbID === action.payload.imdbID)) {
        state.items.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(movie => movie.imdbID !== action.payload);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;