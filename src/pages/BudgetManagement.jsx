// src/pages/BudgetManagement.jsx
import React, { useState } from 'react';

const BudgetManagement = () => {
  const [budgets, setBudgets] = useState([
    { category: 'Food', limit: 300 },
    { category: 'Entertainment', limit: 100 },
  ]);
  const [newBudget, setNewBudget] = useState({ category: '', limit: '' });

  const handleAddBudget = () => {
    setBudgets([...budgets, newBudget]);
    setNewBudget({ category: '', limit: '' });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Budget Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Category"
          value={newBudget.category}
          onChange={(e) =>
            setNewBudget({ ...newBudget, category: e.target.value })
          }
          className="p-2 border rounded mr-2"
        />
        <input
          type="number"
          placeholder="Limit"
          value={newBudget.limit}
          onChange={(e) =>
            setNewBudget({ ...newBudget, limit: e.target.value })
          }
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleAddBudget}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Budget
        </button>
      </div>
      <div>
        {budgets.map((budget, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow flex justify-between mb-2"
          >
            <span>{budget.category}</span>
            <span>${budget.limit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetManagement;
