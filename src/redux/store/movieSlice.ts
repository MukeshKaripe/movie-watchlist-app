import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie, searchMovies, getMovieDetails } from '../../services/api';

interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    selectedMovie: Movie | null;
}

const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null,
    selectedMovie: null,
};

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (query: string, { rejectWithValue }) => {
        try {
            return await searchMovies(query);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (id: string, { rejectWithValue }) => {
        try {
            return await getMovieDetails(id);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

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
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchMovieDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedMovie = action.payload;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setMovies, setLoading, setError } = movieSlice.actions;
export default movieSlice.reducer;
