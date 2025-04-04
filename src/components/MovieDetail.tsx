import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, CircularProgress, Dialog, DialogContent, IconButton } from '@mui/material';
import { getMovieDetails, Movie } from '../services/api';
import { makeStyles } from '@mui/styles';
import { bgColors } from '../utils/colorTheme';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import watchList from '../assets/img/bookmark.png';
import CloseIcon from "@mui/icons-material/Close";
import WatchlistDialog from './watchlistDailogModule';

const useStyles = makeStyles({
    dialogContent: {
        padding: '20px !important',
    },
    posterImage: {
        width: '100%',
        borderRadius: '8px !important',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2) !important',
    },
    infoContainer: {
        paddingLeft: '20px',
        '@media (max-width: 768px)': {
            paddingLeft: '0 !important',
            marginTop: '20px !important',
        },
    },
    title: {
        fontWeight: 'bold !important',
        marginBottom: '8px !important',
        width: '85% !important',
    },
    year: {
        color: '#666 !important',
        marginBottom: '16px !important',
    },
    section: {
        marginBottom: '16px !important',
    },
    label: {
        fontWeight: 'bold !important',
        marginRight: '8px !important',
    },
    addToWatchlistBtn: {
        backgroundColor: `${bgColors.red1} !important`,
        color: 'white !important',
        marginTop: '20px !important',
    },
    closeButton: {
        marginTop: '20px !important',
    },
    ratingContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px !important',
    },
    rating: {
        marginLeft: '8px !important',
        display: 'flex',
        alignItems: 'baseline',
    },
    ratingValue: {
        fontWeight: 'bold !important',
    },
    ratingMax: {
        fontSize: '12px !important',
        position: 'relative',
        top: '-2px !important',
        marginLeft: '2px !important',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px !important',
    }
});

interface MovieDetailProps {
    movieId: string;
    open: boolean;
    onClose: () => void;
    onAddToWatchlist?: (movie: Movie) => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movieId, open, onClose, onAddToWatchlist }) => {
    const classes = useStyles();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovieDetails, setSelectedMovieDetails] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!movieId || !open) return;

            try {
                setLoading(true);
                const details = await getMovieDetails(movieId);
                setMovie(details);
            } catch (err) {
                setError('Failed to load movie details');
                console.error('Error fetching movie details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId, open]);

    const handleAddToWatchlist = () => {
        setIsModalOpen(true)
        if (movie && onAddToWatchlist) {
            onAddToWatchlist(movie);
            // onClose();
        }
        if (movie && onAddToWatchlist) {
            setSelectedMovieDetails(movie); // Store selected movie details locally
            setIsModalOpen(true);
            onAddToWatchlist(movie);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            sx={{ '.css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop': { background: 'unset' } }}
            PaperProps={{
                style: {
                    borderRadius: '8px',
                    overflowY: 'visible'
                }
            }}
        >
            <DialogContent className={classes.dialogContent} >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {loading ? (
                    <Box className={classes.loadingContainer}>
                        <CircularProgress style={{ color: bgColors.red1 }} />
                    </Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : movie ? (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <img
                                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                                alt={movie.Title}
                                className={classes.posterImage}
                            />
                        </Grid>
                        <Grid item xs={12} md={8} className={classes.infoContainer}>
                            <Typography variant="h4" className={classes.title}>
                                {movie.Title}
                            </Typography>
                            <Typography variant="subtitle1" className={classes.year}>
                                {movie.Year}
                            </Typography>

                            {movie.imdbRating && (
                                <Box className={classes.ratingContainer}>
                                    <AddReactionIcon style={{ color: bgColors.red1 }} />
                                    <Box className={classes.rating}>
                                        <Typography className={classes.ratingValue}>
                                            {movie.imdbRating}
                                        </Typography>
                                        <Typography className={classes.ratingMax}>/10</Typography>
                                    </Box>
                                </Box>
                            )}

                            {movie.Runtime && (
                                <Box className={classes.section}>
                                    <Typography component="span" className={classes.label}>Runtime:</Typography>
                                    <Typography component="span">{movie.Runtime}</Typography>
                                </Box>
                            )}

                            {movie.Genre && (
                                <Box className={classes.section}>
                                    <Typography component="span" className={classes.label}>Genre:</Typography>
                                    <Typography component="span">{movie.Genre}</Typography>
                                </Box>
                            )}

                            {movie.Director && (
                                <Box className={classes.section}>
                                    <Typography component="span" className={classes.label}>Director:</Typography>
                                    <Typography component="span">{movie.Director}</Typography>
                                </Box>
                            )}

                            {movie.Actors && (
                                <Box className={classes.section}>
                                    <Typography component="span" className={classes.label}>Cast:</Typography>
                                    <Typography component="span">{movie.Actors}</Typography>
                                </Box>
                            )}

                            {movie.Plot && (
                                <Box className={classes.section}>
                                    <Typography component="span" className={classes.label}>Plot:</Typography>
                                    <Typography paragraph>{movie.Plot}</Typography>
                                </Box>
                            )}

                            {onAddToWatchlist && (
                                <Button
                                    variant="contained"
                                    className={classes.addToWatchlistBtn}
                                    onClick={handleAddToWatchlist}
                                    startIcon={<img width={20} height={20} src={watchList} alt='Bookmark' />}
                                >
                                    Add to Watchlist
                                </Button>
                            )}
                            <WatchlistDialog open={isModalOpen} onClose={() => setIsModalOpen(false)} selectedMovie={selectedMovieDetails} />


                        </Grid>
                    </Grid>
                ) : (
                    <Typography>No movie data available</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default MovieDetail;