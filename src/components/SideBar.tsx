import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {  Theme } from '@mui/material';
import { RootState } from '../../src/redux/store/index';
import { List, ListItem, ListItemText, Typography, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  containersidebar: {
    padding: '20px',
    width: '250px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  drawer: {
    width: '250px',
  },
}));

const SideBar: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const watchlists = useSelector((state: RootState) => state.watchlist.lists);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleListClick = (listId: string) => {
    navigate(`/watchlist/${listId}`);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className={classes.drawer}>
          <Typography variant="h6" gutterBottom>
            Watchlists
          </Typography>
          <List>
            {watchlists.map((list) => (
              <ListItem  key={list.id} onClick={() => handleListClick(list.id)}>
                <ListItemText primary={list.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <div className={classes.containersidebar}>
        <Typography variant="h6" gutterBottom>
          Watchlists
        </Typography>
        <List>
          {watchlists.map((list) => (
            <ListItem  key={list.id} onClick={() => handleListClick(list.id)}>
              <ListItemText primary={list.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default SideBar;
