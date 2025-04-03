import axios from 'axios';

export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Plot?: string;
    Director?: string;
    Actors?: string;
    Genre?: string;
    Runtime?: string;
    imdbRating?: string;
    Type?: string;
    Released?: string;
    Writer?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Metascore?: string;
    Response?: string;
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
//latest movie fetch using api
export const fetchLatestMovies = async (): Promise<Movie[]> => {
    try {
        const currentYear = new Date().getFullYear();

        // First try with current year
        const response = await axios.get(
            `${REACT_APP_BASE_URL}?apikey=${REACT_APP_API_KEY}&s=movie&type=movie&y=${currentYear}&page=1`
        );

        if (response.data.Response === "True" && response.data.Search?.length > 0) {
            return response.data.Search;
        } else {
            // If no results or error, try with previous year
            const previousYear = currentYear - 1;
            const fallbackResponse = await axios.get(
                `${REACT_APP_BASE_URL}?apikey=${REACT_APP_API_KEY}&s=movie&type=movie&y=${previousYear}&page=1`
            );

            if (fallbackResponse.data.Response === "True") {
                return fallbackResponse.data.Search || [];
            }
            return [];
        }
    } catch (error) {
        console.error('Error fetching latest movies:', error);
        return [];
    }
};