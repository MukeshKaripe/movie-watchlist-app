import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store';
// import { logout } from '../store/authSlice';

const Header: React.FC = () => {
    // (state: RootState) => state.auth.user
//   const user = useSelector();
//   const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logout());
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {/* {user ? (
          <>
            <Link to="/watchlist">Watchlist</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )} */}
      </nav>
    </header>
  );
};

export default Header;