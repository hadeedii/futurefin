import React, { useState } from "react";
import { db, auth } from "../firebase"; // Firebase imports
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    date: "",
    category: "Income", // Default category
    amount: "",
    notes: "",
  });
  const navigate = useNavigate(); // For navigation after adding transaction

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser; // Get current authenticated user

    if (!user) {
      alert("You must be logged in to add a transaction.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        ...formData,
        userId: user.uid, // Add user ID to the document
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Transaction added successfully!");
      navigate("/transactions"); // Redirect to transactions page after adding transaction
    } catch (error) {
      console.error("Error adding transaction: ", error);
      alert("Error adding transaction.");
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
      <div className="mb-4">
        <label className="block mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        ></textarea>
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransaction;
