// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth'; // Import signOut function
import { auth } from '../firebase'; // Firebase authentication import

const Navbar = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Firebase signOut
      onLogout(); // Update the parent component's login state to logged out
      alert('Logged out successfully!');
    } catch (error) {
      alert(error.message); // Handle errors if any
    }
  };

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <div>
        <Link to="/" className="font-bold text-xl">Finance Tracker</Link>
      </div>
      <div>
        <Link to="/dashboard" className="px-4">Dashboard</Link>
        <Link to="/transactions" className="px-4">Transactions</Link>
        <Link to="/reports" className="px-4">Reports</Link>
        <Link to="/profile" className="px-4">Profile</Link>
        <Link to="/add-transaction" className="px-4">Add Transaction</Link>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-4"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
