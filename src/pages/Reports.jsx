import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "../firebase";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Expenses",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser; // Get current user
    if (!user) {
      console.error("User not authenticated");
      setLoading(false);
      return;
    }

    // Reference to the user's transactions
    const transactionsCollectionRef = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid) // Filter by user ID
    );

    const unsubscribe = onSnapshot(transactionsCollectionRef, (snapshot) => {
      const transactionsData = {};

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        // Aggregate amounts by category
        if (transactionsData[data.category]) {
          transactionsData[data.category] += parseFloat(data.amount);
        } else {
          transactionsData[data.category] = parseFloat(data.amount);
        }
      });

      // Prepare data for the chart
      const labels = Object.keys(transactionsData);
      const data = Object.values(transactionsData);

      setChartData({
        labels,
        datasets: [
          {
            label: "Expenses",
            data,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      });

      setLoading(false); // Data is now fetched, stop loading
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading reports...</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expense Report",
      },
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="bg-white p-4 rounded shadow">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Reports;
