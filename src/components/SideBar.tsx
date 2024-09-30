// src/components/SideBar.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { RootState } from '../../src/redux/store/index';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const useStyles = makeStyles({
    containersidebar: {
        padding: '20px',
    }
});

const SideBar: React.FC = () => {
    const classes = useStyles();
    const watchlists = useSelector((state: RootState) => state.watchlist.lists);

    return (
        <div className={classes.containersidebar}>
            <Typography variant="h6">Watchlists</Typography>
            <List>
                {watchlists.map((list) => (
                    <ListItem key={list.id}>
                        <ListItemText 
                            primary={list.name} 
                            secondary={`${list.movies.length} movies`} 
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default SideBar;