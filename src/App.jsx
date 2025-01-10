// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Firebase auth import
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import TransactionHistory from './pages/TransactionHistory';
import AddTransaction from './pages/AddTransaction';
import BudgetManagement from './pages/BudgetManagement';
import Reports from './pages/Reports';
import Auth from './pages/Auth';
import UserProfile from './pages/UserProfile';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Set up Firebase authentication state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is logged out
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  // Handle logout logic and update state
  const handleLogout = () => {
    setIsLoggedIn(false); // Set logged-in state to false
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Pass handleLogout function to Navbar */}
        {isLoggedIn && <Navbar onLogout={handleLogout} />}
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<Auth />} />
            {/* Protected Routes */}
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <HomePage />} />
            <Route path="/transactions" element={isLoggedIn ? <TransactionHistory /> : <HomePage />} />
            <Route path="/add-transaction" element={isLoggedIn ? <AddTransaction /> : <HomePage />} />
            <Route path="/budget" element={isLoggedIn ? <BudgetManagement /> : <HomePage />} />
            <Route path="/reports" element={isLoggedIn ? <Reports /> : <HomePage />} />
            <Route path="/profile" element={isLoggedIn ? <UserProfile /> : <HomePage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
