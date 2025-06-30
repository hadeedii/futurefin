// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  CreditCard,
  BarChart3,
  User,
  Plus,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Settings,
  ChevronDown,
  Target,
  Sun,
  Moon,
  Instagram,
  Facebook,
  Mail,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    onLogout();
    alert('Logged out successfully!');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/reports", icon: BarChart3, label: "Reports" },
    { to: "/budget", icon: Target, label: "Budget" },
  ];

  const contactLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/futurefin',
      color: 'hover:text-pink-400'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/futurefin',
      color: 'hover:text-blue-500'
    },
    {
      name: 'Gmail',
      icon: Mail,
      url: 'mailto:contact@futurefin.com',
      color: 'hover:text-red-400'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/futurefin',
      color: 'hover:text-sky-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/futurefin',
      color: 'hover:text-blue-600'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/futurefin',
      color: 'hover:text-gray-300'
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-white/20 dark:border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white transform transition-transform group-hover:scale-105">
                <TrendingUp size={24} />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:text-transparent">
                futurefin
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/50 dark:hover:bg-white/10 transition-all duration-200 transform hover:scale-105"
              >
                <LayoutDashboard size={18} />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link
                to="/budget"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/50 dark:hover:bg-white/10 transition-all duration-200 transform hover:scale-105"
              >
                <Target size={18} />
                <span className="font-medium">Budget Management</span>
              </Link>
              <Link
                to="/reports"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/50 dark:hover:bg-white/10 transition-all duration-200 transform hover:scale-105"
              >
                <BarChart3 size={18} />
                <span className="font-medium">Reports</span>
              </Link>
            </div>
            
            {/* Profile Dropdown */}
            <div className="relative ml-4" ref={profileRef}>
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 transition-colors duration-200"
              >
                <User size={20} className="text-gray-600 dark:text-gray-300" />
                <ChevronDown size={16} className={`text-gray-600 dark:text-gray-300 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-white/20 dark:border-gray-700 py-2 animate-fadeIn z-50">
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <Settings size={18} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-500/20 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/50 dark:hover:bg-white/10 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg mt-2 border border-white/20 dark:border-gray-700 shadow-lg">
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/50 dark:hover:bg-white/10 transition-all duration-200 mx-2 rounded-lg"
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              to="/budget"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/50 dark:hover:bg-white/10 transition-all duration-200 mx-2 rounded-lg"
            >
              <Target size={20} />
              <span className="font-medium">Budget Management</span>
            </Link>
            <Link
              to="/reports"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/50 dark:hover:bg-white/10 transition-all duration-200 mx-2 rounded-lg"
            >
              <BarChart3 size={20} />
              <span className="font-medium">Reports</span>
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/50 dark:hover:bg-white/10 transition-all duration-200 mx-2 rounded-lg"
            >
              <Settings size={20} />
              <span className="font-medium">Profile</span>
            </Link>
            
            {/* Mobile Logout Button */}
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-3 px-4 py-3 mx-2 mt-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 w-full"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;