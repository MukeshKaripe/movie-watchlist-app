import axios from 'axios';

export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Plot?: string;
}

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

export const searchMovies = async (query: string): Promise<Movie[]> => {
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}?apikey=${REACT_APP_API_KEY}&s=${query}`);
        if (response.data.Response === "False") {
            throw new Error(response.data.Error);
        }
        return response.data.Search || [];
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

export const getMovieDetails = async (id: string): Promise<Movie> => {
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}?apikey=${REACT_APP_API_KEY}&i=${id}`);
        if (response.data.Response === "False") {
            throw new Error(response.data.Error);
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};