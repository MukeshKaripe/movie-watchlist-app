import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Button,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    backdropClasses,
} from "@mui/material";
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../src/redux/store/index';
import { createWatchlist, addToWatchlist } from '../../src/redux/store/watchList';
import { Movie } from "../services/api";
import { toast } from "react-toastify";


const useStyles = makeStyles({
    hrt: {
        borderWidth: '5px'
    }
});
interface WatchlistDialogProps {
    open: boolean;
    onClose: () => void;
    selectedMovie: Movie | null;
}


// const WatchlistDialog: React.FC<WatchlistDialogProps> = ({ open, onClose, selectedMovie })
const WatchlistDialog: React.FC<WatchlistDialogProps> = ({ open, onClose, selectedMovie }) => {
    console.log("Selected Movie:", selectedMovie);
    const classes = useStyles();

    const dispatch = useDispatch();
    const [newListName, setNewListName] = useState('');
    const existingWatchlists = useSelector((state: RootState) => state.watchlist.lists);
    const [selectedList, setSelectedList] = useState('');

    const watchlists = useSelector((state: RootState) => state.watchlist.lists);


    const handleCreateList = () => {
        const trimmedName = newListName.trim();
        if (!trimmedName) {
            setTimeout(() => {
                toast.error('Please enter a watchlist name');
            }, 0);
            return;
        }

        const isExisting = existingWatchlists.some(
            list => list.name.toLowerCase() === trimmedName.toLowerCase()
        );

        if (isExisting) {
            setTimeout(() => {
                toast.error(`Watchlist "${trimmedName}" already exists`);
            }, 0);
            return;
        }

        if (!selectedMovie) {
            toast.error("No movie selected");
            return;
        }

        const newId = Date.now().toString();
        dispatch(createWatchlist({ id: newId, name: trimmedName }));
        dispatch(addToWatchlist({ listId: newId, movie: selectedMovie }));

        setTimeout(() => {
            toast.success(`Watchlist "${trimmedName}" created successfully`);
        }, 0);
        handleClose();
    };

    const handleAddToExistingList = () => {
        if (selectedList && selectedMovie) {
            dispatch(addToWatchlist({ listId: selectedList, movie: selectedMovie }));
            setTimeout(() => {
                toast.success(`${selectedMovie.Title} Movie added to Watchlist Successfully`);
            }, 0);
            handleClose();
        } else {
            toast.error("Please select a watchlist and movie");
        }
    };
    const handleClose = () => {
        setNewListName('');
        setSelectedList('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} sx={{ "& .MuiDialog-paperScrollPaper": { minWidth: { xs: "200px", md: "410px" } }, '.css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop': { background: 'unset' } }}>
            <DialogTitle>Add to Watchlist</DialogTitle>
            <DialogContent>
                <DialogContentText>Create a new watchlist or add to an existing one.</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New Watchlist Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                />
                <Button onClick={handleCreateList}>Create & Add</Button>
                <hr className={classes.hrt} />

                <FormControl fullWidth margin="normal">
                    <InputLabel sx={{ background: 'white', padding: '0px 6px' }}>Existing Watchlists</InputLabel>
                    <Select value={selectedList} onChange={(e) => setSelectedList(e.target.value)} displayEmpty>
                        {watchlists.map((list) => (
                            <MenuItem key={list.id} value={list.id}>
                                {list.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button disabled={!selectedList} onClick={handleAddToExistingList}>
                    Add to Selected
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WatchlistDialog;
