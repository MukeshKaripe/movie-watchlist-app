import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../services/api";

interface Watchlist {
    id: string;
    name: string;
    movies: Movie[];
}

interface WatchlistState {
    watchlists: Watchlist[];
}

const initialState: WatchlistState = {
    watchlists: [],
};

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {
        createWatchlist: (state, action: PayloadAction<string>) => {
            state.watchlists.push({ id: crypto.randomUUID(), name: action.payload, movies: [] });
        },
        addMovieToWatchlist: (state, action: PayloadAction<{ watchlistId: string; movie: Movie }>) => {
            const { watchlistId, movie } = action.payload;
            const watchlist = state.watchlists.find((list) => list.id === watchlistId);
            if (watchlist) {
                const movieExists = watchlist.movies.some((m) => m.imdbID === movie.imdbID);
                if (!movieExists) {
                    watchlist.movies.push(movie);
                }
            }
        },
    },
});

export const { createWatchlist, addMovieToWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
