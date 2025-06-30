import React, { useState } from 'react';
import { Trash2, Edit3, Check, X, Plus, AlertTriangle, TrendingUp } from 'lucide-react';

const BudgetManagement = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Food', limit: 300, spent: 180 },
    { id: 2, category: 'Entertainment', limit: 100, spent: 85 },
    { id: 3, category: 'Transportation', limit: 150, spent: 200 }, // Over budget example
  ]);
  
  const [newBudget, setNewBudget] = useState({ category: '', limit: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingBudget, setEditingBudget] = useState({ category: '', limit: '', spent: '' });
  const [errors, setErrors] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  const validateBudget = (budget) => {
    const newErrors = {};
    
    if (!budget.category.trim()) {
      newErrors.category = 'Category is required';
    } else if (budget.category.length < 2) {
      newErrors.category = 'Category must be at least 2 characters';
    }
    
    if (!budget.limit || budget.limit <= 0) {
      newErrors.limit = 'Limit must be greater than 0';
    }
    
    // Check for duplicate categories (only when adding new)
    if (!editingId) {
      const isDuplicate = budgets.some(
        b => b.category.toLowerCase() === budget.category.toLowerCase().trim()
      );
      if (isDuplicate) {
        newErrors.category = 'Category already exists';
      }
    }
    
    return newErrors;
  };

  const handleAddBudget = () => {
    const budgetToValidate = {
      category: newBudget.category.trim(),
      limit: parseFloat(newBudget.limit)
    };
    
    const validationErrors = validateBudget(budgetToValidate);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    const newId = Math.max(...budgets.map(b => b.id), 0) + 1;
    setBudgets([...budgets, { 
      id: newId,
      category: budgetToValidate.category, 
      limit: budgetToValidate.limit,
      spent: 0
    }]);
    setNewBudget({ category: '', limit: '' });
    setErrors({});
    setShowAddForm(false);
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  const handleEditStart = (budget) => {
    setEditingId(budget.id);
    setEditingBudget({
      category: budget.category,
      limit: budget.limit.toString(),
      spent: budget.spent.toString()
    });
    setErrors({});
  };

  const handleEditSave = () => {
    const budgetToValidate = {
      category: editingBudget.category.trim(),
      limit: parseFloat(editingBudget.limit)
    };
    
    const validationErrors = validateBudget(budgetToValidate);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setBudgets(budgets.map(budget => 
      budget.id === editingId 
        ? { 
            ...budget, 
            category: budgetToValidate.category,
            limit: budgetToValidate.limit,
            spent: parseFloat(editingBudget.spent) || 0
          }
        : budget
    ));
    setEditingId(null);
    setEditingBudget({ category: '', limit: '', spent: '' });
    setErrors({});
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingBudget({ category: '', limit: '', spent: '' });
    setErrors({});
  };

  const getProgressPercentage = (spent, limit) => {
    if (limit === 0) return 0;
    return Math.min((spent / limit) * 100, 100);
  };

  const getProgressColor = (spent, limit) => {
    if (limit === 0 && spent > 0) return 'bg-red-500';
    if (limit === 0) return 'bg-green-500';
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getBudgetStatus = (spent, limit) => {
    if (limit === 0 && spent > 0) return { status: 'Over Budget', color: 'text-red-600 dark:text-red-500' };
    if (limit === 0) return { status: 'On Track', color: 'text-green-600 dark:text-green-500' };
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return { status: 'Over Budget', color: 'text-red-600 dark:text-red-500' };
    if (percentage >= 80) return { status: 'Nearly Exceeded', color: 'text-yellow-600 dark:text-yellow-500' };
    return { status: 'On Track', color: 'text-green-600 dark:text-green-500' };
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const overBudgetCount = budgets.filter(budget => budget.spent > budget.limit).length;

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Budget Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Track and manage your spending limits across different categories.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Budget</p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">${totalBudget.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-300">${totalSpent.toFixed(2)}</p>
            </div>
            <div className="text-green-500 dark:text-green-400 text-2xl">💰</div>
          </div>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">Over Budget</p>
              <p className="text-2xl font-bold text-orange-800 dark:text-orange-300">{overBudgetCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-500 dark:text-orange-400" />
          </div>
        </div>
      </div>

      {/* Add Budget Button/Form */}
      <div className="mb-6">
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add New Budget
          </button>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Add New Budget</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Category (e.g., Groceries)"
                  value={newBudget.category}
                  onChange={(e) => {
                    setNewBudget({ ...newBudget, category: e.target.value });
                    if (errors.category) setErrors({ ...errors, category: null });
                  }}
                  className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>
              
              <div>
                <input
                  type="number"
                  placeholder="Budget Limit"
                  value={newBudget.limit}
                  onChange={(e) => {
                    setNewBudget({ ...newBudget, limit: e.target.value });
                    if (errors.limit) setErrors({ ...errors, limit: null });
                  }}
                  className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.limit ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.limit && (
                  <p className="text-red-500 text-sm mt-1">{errors.limit}</p>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddBudget}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Budget
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewBudget({ category: '', limit: '' });
                  setErrors({});
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Budget List Table */}
      <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Budget Limit</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount Spent</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Remaining</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {budgets.map((budget) => {
                const isEditing = editingId === budget.id;
                const { status, color } = getBudgetStatus(
                  isEditing ? parseFloat(editingBudget.spent) || 0 : budget.spent, 
                  isEditing ? parseFloat(editingBudget.limit) || 0 : budget.limit
                );
                const remaining = (isEditing ? parseFloat(editingBudget.limit) : budget.limit) - (isEditing ? parseFloat(editingBudget.spent) : budget.spent);

                return (
                  <tr key={budget.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <div>
                          <input 
                            type="text"
                            value={editingBudget.category}
                            onChange={(e) => {
                              setEditingBudget({ ...editingBudget, category: e.target.value });
                              if (errors.category) setErrors({ ...errors, category: null });
                            }}
                            className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 ${
                              errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                          />
                           {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>
                      ) : (
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{budget.category}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <div>
                          <input 
                            type="number"
                            value={editingBudget.limit}
                            onChange={(e) => {
                              setEditingBudget({ ...editingBudget, limit: e.target.value });
                              if (errors.limit) setErrors({ ...errors, limit: null });
                            }}
                            className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 ${
                              errors.limit ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                          />
                          {errors.limit && <p className="text-red-500 text-sm mt-1">{errors.limit}</p>}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 dark:text-gray-400">${budget.limit.toFixed(2)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       {isEditing ? (
                        <input 
                          type="number"
                          value={editingBudget.spent}
                          onChange={(e) => setEditingBudget({ ...editingBudget, spent: e.target.value })}
                          className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                        />
                      ) : (
                        <div className="text-sm text-gray-500 dark:text-gray-400">${budget.spent.toFixed(2)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${remaining < 0 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                        ${remaining.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-1">
                          <div
                            className={`${getProgressColor(
                              isEditing ? parseFloat(editingBudget.spent) : budget.spent,
                              isEditing ? parseFloat(editingBudget.limit) : budget.limit
                            )} h-2.5 rounded-full`}
                            style={{ width: `${getProgressPercentage(
                              isEditing ? parseFloat(editingBudget.spent) : budget.spent,
                              isEditing ? parseFloat(editingBudget.limit) : budget.limit
                            )}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-medium ${color}`}>
                          {status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {isEditing ? (
                        <div className="flex items-center space-x-2">
                          <button onClick={handleEditSave} className="text-green-600 hover:text-green-900 dark:hover:text-green-400">
                            <Check className="h-5 w-5"/>
                          </button>
                          <button onClick={handleEditCancel} className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                            <X className="h-5 w-5"/>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                           <button onClick={() => handleEditStart(budget)} className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400">
                            <Edit3 className="h-5 w-5"/>
                          </button>
                          <button onClick={() => handleDeleteBudget(budget.id)} className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                            <Trash2 className="h-5 w-5"/>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetManagement;