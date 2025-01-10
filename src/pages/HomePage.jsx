// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Finance Tracker</h1>
      <p className="text-lg text-center mb-6">
        Take control of your finances with ease. Track your expenses, manage your budget, and gain insights into your financial habits.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/auth"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
        >
          Get Started
        </Link>
        <Link
          to="/dashboard"
          className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-900 transition"
        >
          View Dashboard
        </Link>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border rounded shadow">
            <h3 className="font-bold text-xl mb-2">Expense Tracking</h3>
            <p>Log and categorize your daily expenses and incomes.</p>
          </div>
          <div className="p-4 border rounded shadow">
            <h3 className="font-bold text-xl mb-2">Budget Management</h3>
            <p>Set budgets for categories and get alerts when limits are exceeded.</p>
          </div>
          <div className="p-4 border rounded shadow">
            <h3 className="font-bold text-xl mb-2">Visual Insights</h3>
            <p>Understand your financial habits with clear, intuitive charts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
