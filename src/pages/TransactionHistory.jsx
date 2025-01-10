// src/pages/TransactionHistory.jsx
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Firebase imports
import { collection, query, where, getDocs } from 'firebase/firestore';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  // Fetch transactions from Firestore
  const fetchTransactions = async () => {
    const user = auth.currentUser; // Get the current logged-in user

    if (!user) {
      alert('You must be logged in to view transactions.');
      return;
    }

    try {
      // Create a query to get transactions for the current user
      const transactionsRef = collection(db, 'transactions');
      const q = query(transactionsRef, where('userId', '==', user.uid));

      // Log the query execution for debugging
      console.log("Fetching transactions for user ID:", user.uid);

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("No transactions found for this user.");
      }

      const userTransactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Log fetched transactions
      console.log("Fetched transactions:", userTransactions);

      setTransactions(userTransactions); // Set the fetched transactions in the state
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching transactions: ", error);
      setError(error.message); // Store the error message in state
      setLoading(false); // Set loading to false after error
    }
  };

  // Fetch transactions when component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter transactions based on category
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.category.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if there is one
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <input
        type="text"
        placeholder="Filter by category"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <div className="grid gap-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 border rounded shadow flex justify-between"
            >
              <span>{transaction.date}</span>
              <span>{transaction.category}</span>
              <span>${transaction.amount}</span>
              <span>{transaction.notes}</span>
            </div>
          ))
        ) : (
          <div>No transactions found.</div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
