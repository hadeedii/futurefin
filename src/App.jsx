// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import BudgetManagement from './pages/BudgetManagement';
import Reports from './pages/Reports';
import Auth from './pages/Auth';
import UserProfile from './pages/UserProfile';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser({ ...userData, uid: '123' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const isAuthPage = location.pathname === '/auth';
  const isDashboardPage = /^\/(dashboard|transactions|reports|profile|add-transaction|budget)/.test(location.pathname);
  const showLayout = isLoggedIn && !isAuthPage;

  return (
    <div className="flex flex-col min-h-screen">
      {showLayout && <Navbar onLogout={handleLogout} />}
      <main className={`flex-grow ${isDashboardPage ? 'main-content pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={isLoggedIn ? <Navigate to="/" /> : <Auth onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/auth" />} />
          <Route path="/budget" element={isLoggedIn ? <BudgetManagement user={user} /> : <Navigate to="/auth" />} />
          <Route path="/reports" element={isLoggedIn ? <Reports user={user} /> : <Navigate to="/auth" />} />
          <Route path="/profile" element={isLoggedIn ? <UserProfile user={user} /> : <Navigate to="/auth" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {showLayout && <Footer />}
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <Router>
      <AppContent />
    </Router>
  </ThemeProvider>
);

export default App;
