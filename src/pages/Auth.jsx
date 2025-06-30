// src/pages/Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Shield,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    // Mock authentication
    setTimeout(() => {
      onLogin({ email }); // Pass mock user data
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  const features = [
    { icon: Shield, text: 'Bank-level security' },
    { icon: TrendingUp, text: 'Smart insights' },
    { icon: CheckCircle, text: 'Easy to use' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding & Features */}
          <div className="hidden lg:block space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                  <TrendingUp size={32} />
                </div>
                <h1 className="ml-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  futurefin
                </h1>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Take Control of Your
                <span className="text-blue-600"> Financial Future</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of users who have transformed their relationship with money through intelligent tracking and insights.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$2M+</div>
                <div className="text-sm text-gray-600">Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
              
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="lg:hidden flex items-center justify-center mb-4">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
                    <TrendingUp size={24} />
                  </div>
                  <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    futurefin
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Welcome Back!' : 'Create Account'}
                </h3>
                <p className="text-gray-600">
                  {isLogin 
                    ? 'Sign in to access your financial dashboard'
                    : 'Start your journey to financial freedom'
                  }
                </p>
              </div>

              {/* Error Message */}
              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                  <span className="text-red-700 text-sm">{errors.general}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleAuth} className="space-y-6">
                
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field (Signup only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <ArrowRight className="w-5 h-5 mr-2" />
                  )}
                  {isLoading 
                    ? 'Processing...' 
                    : isLogin 
                      ? 'Sign In' 
                      : 'Create Account'
                  }
                </button>

                {/* Toggle Auth Mode */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrors({});
                      setConfirmPassword('');
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    {isLogin 
                      ? "Don't have an account? Sign up" 
                      : 'Already have an account? Sign in'
                    }
                  </button>
                </div>
              </form>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-2" />
                  Your data is protected with bank-level security
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
