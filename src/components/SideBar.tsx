import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Box, Button, InputBaseProps, TextField, Theme } from '@mui/material';
import { RootState } from '../../src/redux/store/index';
import { List, ListItem, ListItemText, Typography, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { bgColors } from '../utils/colorTheme';
import HomeIcon from '@mui/icons-material/Home';
import UserMenu from './UserMenu';

const useStyles = makeStyles((theme: Theme) => ({
  containersidebar: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '94%',
    [theme.breakpoints.down('sm')]: {
      display: 'none !important',
    },
  },
  customText: {
    textAlign: 'center',
    fontWeight: 'bold !important',
    fontSize: '30px  !important',
    color: 'red',
  },
  menuButton: {
    display: 'none !important',
    [theme.breakpoints.down('sm')]: {
      display: 'block !important',
    },
  },
  drawer: {
    width: '250px',
  },
  searchSidebar: {
    input: {
      borderRadius: "4px",
      Padding: '10px'
    }
  },
  homeButton: {
    backgroundColor: 'red !important',
    width: '100%',
    justifyContent: 'flex-start !important',
    '&:hover': {
      backgroundColor: 'darkred',
    },
  },
  homeIcon: {
    marginRight: '8px',
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
  const inputProps: InputBaseProps = {
    style: {
      borderRadius: "8px",
      fontSize: "14px",
      padding: '10px'
    },
  };
  const handleNavigateHome = () => {
    navigate('/'); // Navigate to the home path
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
          <Typography className={classes.customText} variant="h6" gutterBottom>
            Watchlists
          </Typography>
          <List>
            {watchlists.map((list) => (
              <ListItem key={list.id} onClick={() => handleListClick(list.id)}>
                <ListItemText primary={list.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

     <Box className={classes.containersidebar}>
     <Box >
        <Typography className={classes.customText} variant="h6" gutterBottom>
          Watchlists
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            fullWidth
            placeholder="Search"
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: bgColors.gray1 }} />,
              inputProps: {
                style: { padding: '4px 8px' }
              }
            }}
            className={classes.searchSidebar}
          />

        </Box>
        <Button sx={{mt:3,mb:1}}
          variant="contained"
          className={classes.homeButton}
          startIcon={<HomeIcon className={classes.homeIcon} />}
          onClick={handleNavigateHome} >
          Home
        </Button>
        <hr/>
        <List>
          {watchlists.map((list) => (
            <ListItem key={list.id} onClick={() => handleListClick(list.id)}>
              <ListItemText primary={list.name} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <UserMenu/>
      </Box>
     </Box>
    </>
  );
};

export default SideBar;
