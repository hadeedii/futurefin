// src/pages/Auth.jsx
import React, { useState } from 'react';
import { auth } from '../firebase'; // Make sure this is correctly importing Firebase config
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // React Router hook to programmatically navigate

  // Handle login/signup
  const handleAuth = async () => {
    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully!');
        // Redirect to home after login
        navigate('/'); // Navigate to home page (or to the dashboard)
      } else {
        // Signup
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created successfully!');
        // Redirect to home after signup
        navigate('/'); // Redirect to home page after successful signup
      }
    } catch (error) {
      alert(error.message); // Display error message
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Signup'}</h1>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <button
        onClick={handleAuth}
        className="p-2 bg-blue-500 text-white rounded w-full"
      >
        {isLogin ? 'Login' : 'Signup'}
      </button>
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 underline"
        >
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
