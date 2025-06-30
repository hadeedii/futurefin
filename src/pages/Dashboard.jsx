import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Wallet, Plus, Filter, Calendar } from "lucide-react";

const Dashboard = ({ user = { name: "John Doe" } }) => {
  const [transactions, setTransactions] = useState([
    { id: '1', date: '2024-07-28', category: 'Salary', type: 'Income', amount: 2500, notes: 'Monthly salary' },
    { id: '2', date: '2024-07-28', category: 'Groceries', type: 'Expense', amount: 50, notes: 'Weekly shopping' },
    { id: '3', date: '2024-07-27', category: 'Transportation', type: 'Expense', amount: 25, notes: 'Gas' },
    { id: '4', date: '2024-07-26', category: 'Freelance', type: 'Income', amount: 300, notes: 'Web design project' },
    { id: '5', date: '2024-07-25', category: 'Entertainment', type: 'Expense', amount: 40, notes: 'Movie tickets' },
  ]);

  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    type: 'Expense',
    amount: '',
    notes: ''
  });

  const [metrics, setMetrics] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  // Calculate metrics whenever transactions change
  useEffect(() => {
    const income = transactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const expenses = transactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    setMetrics({
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses
    });
  }, [transactions]);

  // Filter transactions
  useEffect(() => {
    let filtered = transactions;
    
    if (filterType !== 'All') {
      filtered = filtered.filter(t => t.type === filterType);
    }
    
    if (filterCategory !== 'All') {
      filtered = filtered.filter(t => t.category === filterCategory);
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setFilteredTransactions(filtered);
  }, [transactions, filterType, filterCategory]);

  const categories = [...new Set(transactions.map(t => t.category))];

  const handleAddTransaction = () => {
    if (!newTransaction.category || !newTransaction.amount) return;

    const transaction = {
      id: Date.now().toString(),
      ...newTransaction,
      amount: Number(newTransaction.amount)
    };

    setTransactions(prev => [...prev, transaction]);
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      category: '',
      type: 'Expense',
      amount: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getBalanceColor = () => {
    if (metrics.balance > 0) return 'text-green-600';
    if (metrics.balance < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Dashboard</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-100 dark:bg-green-900/50 rounded-lg shadow">
          <p className="text-sm text-green-700 dark:text-green-300">Total Income</p>
          <p className="text-2xl font-bold text-green-800 dark:text-green-200">${metrics.totalIncome.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-red-100 dark:bg-red-900/50 rounded-lg shadow">
          <p className="text-sm text-red-700 dark:text-red-300">Total Expenses</p>
          <p className="text-2xl font-bold text-red-800 dark:text-red-200">${metrics.totalExpenses.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg shadow">
          <p className="text-sm text-blue-700 dark:text-blue-300">Balance</p>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">${metrics.balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Add Transaction Button & Form */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          {showAddForm ? 'Cancel' : 'Add Transaction'}
        </button>

        {showAddForm && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                placeholder="Category"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
              <input
                type="text"
                placeholder="Notes (Optional)"
                value={newTransaction.notes}
                onChange={(e) => setNewTransaction({ ...newTransaction, notes: e.target.value })}
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
            </div>
            <button
              onClick={handleAddTransaction}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Transaction
            </button>
          </div>
        )}
      </div>

      {/* Transactions Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border-b dark:border-gray-600 p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Date</th>
                <th className="border-b dark:border-gray-600 p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Category</th>
                <th className="border-b dark:border-gray-600 p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Amount</th>
                <th className="border-b dark:border-gray-600 p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="border-b dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">{txn.date}</td>
                  <td className="border-b dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">{txn.category}</td>
                  <td className={`border-b dark:border-gray-700 p-3 ${txn.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                    {txn.type === 'Income' ? '+' : '-'} {formatCurrency(txn.amount)}
                  </td>
                  <td className="border-b dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">{txn.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;