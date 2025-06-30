import React, { useState, useEffect } from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Reports = ({ user }) => {
  const [activeChart, setActiveChart] = useState('overview');

  // Sample data - you can replace this with real data
  const [transactionData, setTransactionData] = useState({
    totalIncome: 5500,
    totalExpense: 3200,
    categories: {
      income: {
        salary: 4000,
        freelance: 1200,
        investments: 300
      },
      expense: {
        food: 800,
        transport: 400,
        utilities: 300,
        entertainment: 250,
        healthcare: 200,
        shopping: 450,
        other: 800
      }
    },
    monthlyData: [
      { month: 'Jan', income: 4500, expense: 2800 },
      { month: 'Feb', income: 5200, expense: 3100 },
      { month: 'Mar', income: 4800, expense: 2900 },
      { month: 'Apr', income: 5500, expense: 3200 },
      { month: 'May', income: 5100, expense: 3400 },
      { month: 'Jun', income: 5800, expense: 3600 }
    ]
  });

  // Overview Bar Chart Data
  const overviewBarData = {
    labels: ['Income', 'Expense', 'Net Savings'],
    datasets: [
      {
        label: "Amount ($)",
        data: [
          transactionData.totalIncome,
          transactionData.totalExpense,
          transactionData.totalIncome - transactionData.totalExpense
        ],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(59, 130, 246, 0.8)"
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(59, 130, 246, 1)"
        ],
        borderWidth: 2,
      },
    ],
  };

  // Income Pie Chart Data
  const incomePieData = {
    labels: Object.keys(transactionData.categories.income).map(key => 
      key.charAt(0).toUpperCase() + key.slice(1)
    ),
    datasets: [
      {
        data: Object.values(transactionData.categories.income),
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(5, 150, 105, 0.8)",
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(5, 150, 105, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Expense Doughnut Chart Data
  const expenseDoughnutData = {
    labels: Object.keys(transactionData.categories.expense).map(key => 
      key.charAt(0).toUpperCase() + key.slice(1)
    ),
    datasets: [
      {
        data: Object.values(transactionData.categories.expense),
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(245, 101, 101, 0.8)",
          "rgba(248, 113, 113, 0.8)",
          "rgba(252, 165, 165, 0.8)",
          "rgba(254, 202, 202, 0.8)",
          "rgba(220, 38, 127, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(245, 101, 101, 1)",
          "rgba(248, 113, 113, 1)",
          "rgba(252, 165, 165, 1)",
          "rgba(254, 202, 202, 1)",
          "rgba(220, 38, 127, 1)",
          "rgba(168, 85, 247, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Monthly Trend Line Chart Data
  const monthlyTrendData = {
    labels: transactionData.monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Income',
        data: transactionData.monthlyData.map(item => item.income),
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expense',
        data: transactionData.monthlyData.map(item => item.expense),
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: 'white',
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: $${context.parsed || context.parsed.y || context.raw}`;
          }
        }
      }
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      y: {
        ticks: {
          color: 'white',
          callback: function(value) {
            return '$' + value;
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const lineOptions = {
    ...commonOptions,
    scales: {
      y: {
        ticks: {
          color: 'white',
          callback: function(value) {
            return '$' + value;
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const pieOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: $${context.raw} (${percentage}%)`;
          }
        }
      }
    }
  };

  const chartButtons = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'income', label: 'Income', icon: '💰' },
    { id: 'expense', label: 'Expenses', icon: '💸' },
    { id: 'trend', label: 'Trends', icon: '📈' }
  ];

  const renderChart = () => {
    switch(activeChart) {
      case 'overview':
        return (
          <div className="h-96">
            <Bar data={overviewBarData} options={barOptions} />
          </div>
        );
      case 'income':
        return (
          <div className="h-96">
            <Pie data={incomePieData} options={pieOptions} />
          </div>
        );
      case 'expense':
        return (
          <div className="h-96">
            <Doughnut data={expenseDoughnutData} options={pieOptions} />
          </div>
        );
      case 'trend':
        return (
          <div className="h-96">
            <Line data={monthlyTrendData} options={lineOptions} />
          </div>
        );
      default:
        return null;
    }
  };

  const getChartTitle = () => {
    switch(activeChart) {
      case 'overview':
        return 'Financial Overview';
      case 'income':
        return 'Income Distribution';
      case 'expense':
        return 'Expense Breakdown';
      case 'trend':
        return 'Monthly Trends';
      default:
        return 'Reports';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Financial Reports Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Income</h3>
            <p className="text-3xl font-bold">${transactionData.totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
            <p className="text-3xl font-bold">${transactionData.totalExpense.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Net Savings</h3>
            <p className="text-3xl font-bold">
              ${(transactionData.totalIncome - transactionData.totalExpense).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Chart Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {chartButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setActiveChart(button.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeChart === button.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              <span className="text-lg">{button.icon}</span>
              {button.label}
            </button>
          ))}
        </div>

        {/* Chart Container */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">{getChartTitle()}</h2>
          {renderChart()}
        </div>

        {/* Additional Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Top Expense Categories</h3>
            <div className="space-y-3">
              {Object.entries(transactionData.categories.expense)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([category, amount]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="capitalize">{category}</span>
                  <span className="font-semibold">${amount}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Savings Rate</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {(((transactionData.totalIncome - transactionData.totalExpense) / transactionData.totalIncome) * 100).toFixed(1)}%
              </div>
              <p className="text-gray-400">of income saved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;