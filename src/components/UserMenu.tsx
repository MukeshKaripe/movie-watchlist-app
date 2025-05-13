import React, { useEffect, useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  personContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #ccc',
    padding: '0px 10px',
    borderRadius: '4px'
  },
  guestName: {
    marginLeft: '8px',
    fontWeight: 'bold',
  },
  personSvg: {
    width: '1.5em',
    height: '1.5em',
    marginRight: '7px'
  }
});

const UserMenu = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Guest');
  // State to manage menu open/close
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    setTimeout(() => {
      toast.success('Logout successful!');
      setTimeout(() => {
        // Replace history so user can't go back
        navigate('/login', { replace: true });
      }, 1000);
    }, 0);
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUserName(parsedUser?.name || 'Guest');
    }
  }, []);

  return (
    <Box className={classes.personContainer}>
      <Box sx={{ display: 'flex' }} alignItems={'center'} flexGrow={1} >
        <AccountCircleIcon className={classes.personSvg} />
        <Typography className={classes.guestName}>{userName}</Typography>
      </Box>
      <Tooltip title={'More options'}
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
        }}>
        <IconButton onClick={handleMenuOpen}>
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      {/* Menu for the three-dot icon */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose} >
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
      <ToastContainer position="top-center" autoClose={3000} />
    </Box>
  );
};

export default UserMenu;
