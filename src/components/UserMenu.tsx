import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

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

  // State to manage menu open/close
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login'); // Redirect to login page after sign out
  };

  return (
    <Box className={classes.personContainer}>
      <Box sx={{ display: 'flex' }} alignItems={'center'} flexGrow={1} >
        <AccountCircleIcon className={classes.personSvg} />
        <Typography className={classes.guestName}>Guest</Typography>
      </Box>
      <IconButton onClick={handleMenuOpen}>
        <MoreHorizIcon />
      </IconButton>
      {/* Menu for the three-dot icon */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose} >
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
