import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Box, Button, TextField, Theme, Tooltip } from '@mui/material';
import { RootState } from '../../src/redux/store/index';
import { List, ListItem, ListItemText, Typography, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { bgColors } from '../utils/colorTheme';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import UserMenu from './UserMenu';
import { BiMoviePlay } from "react-icons/bi";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { createWatchlist, deleteWatchlist } from '../redux/store/watchList';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme: Theme) => ({
  containersidebar: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '94%',
    '@media (max-width: 1024px)': {
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
    backgroundColor: '#fff !important',
    '@media (max-width: 1024px)': {
      display: 'block !important',
      position: 'absolute',
      left: '40px',
      Padding: '0px !important',
      width: '100%'
    },
    '@media (max-width: 768px)': {
      left: '20px',
    },
  },
  closeMenu: {
    position: 'absolute',
    right: '20px',
    top: '10px',
    cursor: 'pointer'
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
    marginBottom: '15px',
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
  const dispatch = useDispatch();
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
  const handleCreateNewWatchlist = () => {
    const trimmedName = searchQuery.trim();
    if (!trimmedName) return;

    const alreadyExists = watchlists.some(
      (list) => list.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      toast.error(`Watchlist "${trimmedName}" already exists`);
      return;
    }

    const newId = Date.now().toString();
    dispatch(createWatchlist({ id: newId, name: trimmedName }));

    toast.success(`Watchlist "${trimmedName}" created`);
    setSearchQuery('');
  };
  const handleDeleteList = (listed: any) => {
    if (window.confirm(`Are you sure you want to delete "${listed.name}"?`)) {
      dispatch(deleteWatchlist(listed.id));
      toast.success(`"${listed.name}" has been deleted.`);

      // Navigate to home after ensuring state update
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  }
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
                  endAdornment: searchQuery.trim() !== '' && filteredWatchlists.length === 0 && (
                    <Tooltip
                      title={`Click to create new Watchlist: "${searchQuery}"`}
                      placement="top"
                      arrow
                      enterDelay={500}
                      leaveDelay={200}
                      sx={{
                        '& .MuiTooltip-tooltip': {
                          backgroundColor: 'rgba(0, 0, 0, 0.87)',
                          padding: '8px 12px',
                          fontSize: '14px',
                        },
                      }}
                    >
                      <IconButton onClick={handleCreateNewWatchlist}>
                        <AddIcon sx={{ color: 'primary.main' }} />
                      </IconButton>
                    </Tooltip>
                  ),
                  inputProps: {
                    style: { padding: '10px 8px' }
                  }
                }}
                className={classes.searchSidebar}
              />
            </Box>
            <Tooltip
              title="Go to Home Page"
              placement="top"
              arrow
              enterDelay={500}
              leaveDelay={200}
              sx={{
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'rgba(0, 0, 0, 0.87)',
                  padding: '8px 12px',
                  fontSize: '14px',
                },
              }}
            >
              <Button
                sx={{ mt: 3, mb: 1 }}
                variant="contained"
                className={classes.homeButton}
                startIcon={<HomeIcon className={classes.homeIcon} />}
                onClick={handleNavigateHome}
              >
                Home
              </Button>
            </Tooltip>
            <hr />
            <Typography variant='h6' pl={2} >My Lists</Typography>
            <List className={classes.personContainerList}>
              {(filteredWatchlists?.map((list) => (

                <ListItem
                  className={classes.personContainer}
                  onClick={() => handleListClick(list.id)}
                >
                  <BiMoviePlay className={classes.movieListIcon} />
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
                    <ListItemText primary={list.name} className={classes.textEllipsis} />
                  </Tooltip>
                  <Tooltip
                    title="Click to Delete Watchlist"
                    placement="top"
                    arrow
                    enterDelay={500}
                    leaveDelay={200}
                    sx={{
                      '& .MuiTooltip-tooltip': {
                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                        padding: '8px 12px',
                        fontSize: '14px',
                      },
                    }}
                  >
                    <DeleteIcon onClick={() => handleDeleteList(list)} />
                  </Tooltip>
                </ListItem>
              )))}
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
                endAdornment: searchQuery.trim() !== '' && filteredWatchlists.length === 0 && (
                  <Tooltip
                    title={`Click to create new Watchlist: "${searchQuery}"`}
                    placement="top"
                    arrow
                    enterDelay={500}
                    leaveDelay={200}
                    sx={{
                      '& .MuiTooltip-tooltip': {
                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                        padding: '8px 12px',
                        fontSize: '14px',
                      },
                    }}
                  >
                    <IconButton onClick={handleCreateNewWatchlist}>
                      <AddIcon sx={{ color: 'primary.main' }} />
                    </IconButton>
                  </Tooltip>
                ),
                inputProps: {
                  style: { padding: '10px 8px' }
                }
              }}
              className={classes.searchSidebar}
            />
          </Box>

          <Tooltip
            title="Go to Home Page"
            placement="top"
            arrow
            enterDelay={500}
            leaveDelay={200}
            sx={{
              '& .MuiTooltip-tooltip': {
                backgroundColor: 'rgba(0, 0, 0, 0.87)',
                padding: '8px 12px',
                fontSize: '14px',
              },
            }}
          >
            <Button
              sx={{ mt: 3, mb: 1 }}
              variant="contained"
              className={classes.homeButton}
              startIcon={<HomeIcon className={classes.homeIcon} />}
              onClick={handleNavigateHome}
            >
              Home
            </Button>
          </Tooltip>
          <hr />
          <Typography variant='h6' pl={2} >My Lists</Typography>
          <List className={classes.personContainerList}>
            {(filteredWatchlists?.map((list) => (

              <ListItem
                className={classes.personContainer}
                onClick={() => handleListClick(list.id)}
              >
                <BiMoviePlay className={classes.movieListIcon} />
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
                  <ListItemText primary={list.name} className={classes.textEllipsis} />
                </Tooltip>
                <Tooltip
                  title="Click to Delete Watchlist"
                  placement="top"
                  arrow
                  enterDelay={500}
                  leaveDelay={200}
                  sx={{
                    '& .MuiTooltip-tooltip': {
                      backgroundColor: 'rgba(0, 0, 0, 0.87)',
                      padding: '8px 12px',
                      fontSize: '14px',
                    },
                  }}
                >
                  <DeleteIcon onClick={() => handleDeleteList(list)} />
                </Tooltip>
              </ListItem>
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
