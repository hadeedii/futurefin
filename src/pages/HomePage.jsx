// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  PieChart,
  Target,
  BarChart3,
  Shield,
  Smartphone,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  DollarSign,
  Calendar,
  Bell
} from 'lucide-react';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: "Smart Expense Tracking",
      description: "AI-powered categorization and real-time expense monitoring with intelligent insights.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Goal-Based Budgeting",
      description: "Set personalized financial goals and track progress with visual milestones.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Interactive dashboards with predictive analytics and spending pattern recognition.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit encryption and multi-factor authentication to protect your financial data.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Seamless experience across all devices with offline capability and sync.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Intelligent alerts for bill reminders, budget limits, and financial opportunities.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "$2M+", label: "Money Tracked", icon: DollarSign },
    { number: "99.9%", label: "Uptime", icon: Zap },
    { number: "4.9/5", label: "User Rating", icon: Star }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "Finance Tracker transformed how I manage my business expenses. The insights are incredible!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Software Engineer",
      content: "Finally, a finance app that actually understands my spending patterns. Highly recommended!",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Freelancer",
      content: "The budgeting features helped me save 30% more this year. Game-changer!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 text-gray-800 dark:text-gray-200">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Main Headline */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded-full text-sm font-semibold mb-4 animate-bounce">
                🚀 #1 Personal Finance App
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Master Your
                </span>
                <br />
                <span className="text-gray-900 dark:text-gray-100">Financial Future</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your relationship with money through intelligent tracking, 
              <span className="text-blue-600 dark:text-blue-400 font-semibold"> AI-powered insights</span>, and 
              personalized financial guidance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                to="/auth"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/dashboard"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-lg hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 transform hover:scale-105"
              >
                View Live Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                No Credit Card Required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                14-Day Free Trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Cancel Anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white mb-4">
                    <IconComponent size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Smart Money Management</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to take control of your finances, make informed decisions, and achieve your financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 dark:border-gray-700/50 overflow-hidden"
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={28} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover Arrow */}
                  <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">
            Loved by Thousands of Users
          </h2>
          
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl transform transition-all duration-500">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl text-gray-700 mb-6 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div>
                <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
              </div>
            </div>
            
            {/* Testimonial Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who have already taken control of their financial future.
          </p>
          
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          
          <div className="mt-8 text-sm text-gray-400">
            Start your free trial • No credit card required • Cancel anytime
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;