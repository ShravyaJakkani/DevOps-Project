// src/components/Layout.js
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        {/* <Link to="/" className="logo"> */}
         <h1 style={{color:"black"}}>ThinkSync</h1> 
        {/* </Link> */}
        <div className="nav-links">
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <Link to="/create" className="btn btn-primary">
                Create Post
              </Link>
              <button onClick={handleLogout} className="btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;