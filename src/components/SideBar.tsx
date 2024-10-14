import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Box, Button, TextField, Theme, Tooltip } from '@mui/material';
import { RootState } from '../../src/redux/store/index';
import { List, ListItem, ListItemText, Typography, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { bgColors } from '../utils/colorTheme';
import HomeIcon from '@mui/icons-material/Home';
import UserMenu from './UserMenu';
import { BiMoviePlay } from "react-icons/bi";
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme: Theme) => ({
  containersidebar: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '94%',
    '@media (max-width: 767px)': {
      display: 'none !important',
    },
  },
  containersidebarDrawer: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  customText: {
    textAlign: 'center',
    fontWeight: 'bold !important',
    fontSize: '30px  !important',
    color: 'red',
  },
  menuButton: {
    display: 'none !important',
    '@media (max-width: 767px)': {
      display: 'block !important',
      position: 'fixed',
      left: '20px',
    },
  },
  closeMenu: {
    position: 'absolute',
    right: '20px',
    top: '10px'
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
  personContainer: {
    border: '1px solid #ccc',
    padding: '0px 10px !important',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  movieListIcon: {
    paddingRight: '7px',
    width: '20px',
    height: '20px'
  },
  textEllipsis: {
    width: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  personContainerList: {
    maxHeight: '50vh',
    overflow: 'auto'
  }
}));

const SideBar: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const watchlists = useSelector((state: RootState) => state.watchlist.lists);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleListClick = (listId: string) => {
    navigate(`/watchlist/${listId}`);
  };
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const handleNavigateHome = () => {
    navigate('/'); // Navigate to the home path
  };
  //filter search
  const filteredWatchlists = watchlists.filter((list) =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
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
        <CloseIcon className={classes.closeMenu} onClick={() => setDrawerOpen(false)} />
        <Box className={classes.containersidebarDrawer}>
          <Box >
            <Typography className={classes.customText} variant="h6" gutterBottom>
              Watchlists
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <TextField
                fullWidth
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: bgColors.gray1 }} />,
                  inputProps: {
                    style: { padding: '4px 8px' }
                  }
                }}
                className={classes.searchSidebar}
              />
            </Box>
            <Button sx={{ mt: 3, mb: 1 }}
              variant="contained"
              className={classes.homeButton}
              startIcon={<HomeIcon className={classes.homeIcon} />}
              onClick={handleNavigateHome} >
              Home
            </Button>
            <hr />
            <Typography variant='h6' pl={2} >My Lists</Typography>
            <List className={classes.personContainerList}>
              {filteredWatchlists.map((list) => (
                <Tooltip
                  title={list.name}
                  placement="top"
                  arrow
                  enterDelay={500}
                  leaveDelay={200}
                  sx={{
                    '& .MuiTooltip-tooltip': {
                      backgroundColor: 'rgba(0, 0, 0, 0.87)',
                      padding: '8px 12px',
                      fontSize: '14px'
                    }
                  }}
                  key={list.id} // Moved key here for better optimization
                >
                  <ListItem
                    className={classes.personContainer}
                    onClick={() => handleListClick(list.id)}
                  >
                    <BiMoviePlay className={classes.movieListIcon} />
                    <ListItemText primary={list.name} className={classes.textEllipsis} />
                  </ListItem>
                </Tooltip>
              ))}
            </List>
          </Box>
          <Box>
            <UserMenu />
          </Box>
        </Box>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: bgColors.gray1 }} />,
                inputProps: {
                  style: { padding: '4px 8px' }
                }
              }}
              className={classes.searchSidebar}
            />
          </Box>
          <Button sx={{ mt: 3, mb: 1 }}
            variant="contained"
            className={classes.homeButton}
            startIcon={<HomeIcon className={classes.homeIcon} />}
            onClick={handleNavigateHome} >
            Home
          </Button>
          <hr />
          <Typography variant='h6' pl={2} >My Lists</Typography>
          <List className={classes.personContainerList}>
            {(filteredWatchlists?.map((list) => (
              <Tooltip
                title={list.name}
                placement="top"
                arrow
                enterDelay={500}
                leaveDelay={200}
                sx={{
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: 'rgba(0, 0, 0, 0.87)',
                    padding: '8px 12px',
                    fontSize: '14px'
                  }
                }}
                key={list.id} // Moved key here for better optimization
              >
                <ListItem
                  className={classes.personContainer}
                  onClick={() => handleListClick(list.id)}
                >
                  <BiMoviePlay className={classes.movieListIcon} />
                  <ListItemText primary={list.name} className={classes.textEllipsis} />
                </ListItem>
              </Tooltip>
            )))}
          </List>
        </Box>
        <Box>
          <UserMenu />
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
