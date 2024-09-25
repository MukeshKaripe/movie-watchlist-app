import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../services/api';

interface MovieState {
    movies: Movie[];
    loading: boolean;
}

const initialState: MovieState = {
    movies: [],
    loading: false,
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setMovies, setLoading } = movieSlice.actions;
export default movieSlice.reducer;
