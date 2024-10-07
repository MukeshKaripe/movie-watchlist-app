import React, { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import here
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toast
import Home from '../components/Home';
import Signup from '../pages/SignUp';
import LogIn from '../pages/Login';
interface PrivateRouteProps {
    children: ReactNode;
    isAuthenticated: boolean;
}

const AppRoutes: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const safeRoute = localStorage.getItem('isAuthenticated');
        if (safeRoute === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const PrivateRoute = ({ children, isAuthenticated }: PrivateRouteProps) => {
        return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
    };

    return (
        <Router>
        <div className="App">
          <Routes>
            <Route
              path="/*"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LogIn setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </Router>
    );
};

export default AppRoutes;
