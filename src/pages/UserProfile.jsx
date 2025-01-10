// src/pages/UserProfile.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { updatePassword } from "firebase/auth";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    email: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");

  // Fetch the logged-in user's email
  useEffect(() => {
    if (auth.currentUser) {
      setUserData((prev) => ({
        ...prev,
        email: auth.currentUser.email, // Fetch email from Firebase Auth
      }));
    }
  }, []);

  // Handle password update
  const handleUpdatePassword = async () => {
    if (!userData.newPassword) {
      setMessage("Please enter a new password.");
      return;
    }

    try {
      const user = auth.currentUser; // Get the current user
      if (user) {
        await updatePassword(user, userData.newPassword); // Update the password
        setMessage("Password updated successfully!");
        setUserData((prev) => ({
          ...prev,
          newPassword: "",
        }));
      } else {
        setMessage("No user is logged in.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={userData.email}
          className="p-2 border rounded w-full"
          disabled // Make email read-only
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">New Password</label>
        <input
          type="password"
          placeholder="Enter New Password"
          value={userData.newPassword}
          onChange={(e) =>
            setUserData({ ...userData, newPassword: e.target.value })
          }
          className="p-2 border rounded w-full"
        />
      </div>
      <button
        onClick={handleUpdatePassword}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Update Password
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default UserProfile;
