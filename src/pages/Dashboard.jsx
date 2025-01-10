import React, { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, query, where } from "firebase/firestore";
import { db, auth } from "../firebase";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [metrics, setMetrics] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  useEffect(() => {
    // Get the current user ID from Firebase Authentication
    const userId = auth.currentUser?.uid;
    if (!userId) return; // If no user is logged in, exit

    // Set up a real-time listener for transactions collection filtered by user ID
    const transactionsCollectionRef = collection(db, "transactions");

    // Query transactions where the userId matches the authenticated user's ID
    const userTransactionsQuery = query(
      transactionsCollectionRef,
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(userTransactionsQuery, (snapshot) => {
      const transactionData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTransactions(transactionData);

      // Calculate metrics
      const income = transactionData
        .filter((txn) => txn.category === "Income")
        .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

      const expenses = transactionData
        .filter((txn) => txn.category === "Expense")
        .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

      setMetrics({
        totalIncome: income,
        totalExpenses: expenses,
        balance: income - expenses,
      });
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const handleAddTransaction = async (newTransaction) => {
    try {
      // Add the transaction to the Firestore 'transactions' collection with userId
      const userId = auth.currentUser?.uid;
      if (!userId) return; // Ensure the user is authenticated

      await addDoc(collection(db, "transactions"), {
        ...newTransaction,
        userId, // Attach the user ID to the transaction
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-200 rounded shadow">
          Total Income: ${metrics.totalIncome.toFixed(2)}
        </div>
        <div className="p-4 bg-red-200 rounded shadow">
          Total Expenses: ${metrics.totalExpenses.toFixed(2)}
        </div>
        <div className="p-4 bg-blue-200 rounded shadow">
          Balance: ${metrics.balance.toFixed(2)}
        </div>
      </div>

      {/* Transactions Table */}
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td className="border border-gray-300 p-2">{txn.date}</td>
              <td className="border border-gray-300 p-2">{txn.category}</td>
              <td className="border border-gray-300 p-2">${txn.amount}</td>
              <td className="border border-gray-300 p-2">{txn.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add transaction form (Example) */}
      <button
        onClick={() =>
          handleAddTransaction({
            date: new Date().toLocaleDateString(),
            category: "Expense",
            amount: "50.00",
            notes: "Test transaction",
          })
        }
      >
        Add Test Expense
      </button>
    </div>
  );
};

export default Dashboard;
