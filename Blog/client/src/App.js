// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogList from './pages/BlogList';
import CreateBlog from './pages/CreateBlog';
import Layout from './components/Layout';
import './style.css';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BlogList />} />
        <Route path="login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        <Route path="register" element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />} />
        <Route
          path="create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;