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
        return response.data.Search || [];
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
};

export const getMovieDetails = async (id: string): Promise<Movie | null> => {
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}?apikey=${REACT_APP_API_KEY}&i=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};
