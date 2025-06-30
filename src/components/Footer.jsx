// src/components/Footer.jsx
import React from 'react';
import {
  Instagram,
  Facebook,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Heart,
  MapPin,
  Phone,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/futurefin',
      color: 'hover:text-pink-400 hover:scale-110'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/futurefin',
      color: 'hover:text-blue-500 hover:scale-110'
    },
    {
      name: 'Gmail',
      icon: Mail,
      url: 'mailto:contact@futurefin.com',
      color: 'hover:text-red-400 hover:scale-110'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/futurefin',
      color: 'hover:text-sky-400 hover:scale-110'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/futurefin',
      color: 'hover:text-blue-600 hover:scale-110'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/futurefin',
      color: 'hover:text-gray-300 hover:scale-110'
    }
  ];

  const quickLinks = [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Transactions', url: '/transactions' },
    { name: 'Reports', url: '/reports' },
    { name: 'Settings', url: '/settings' },
    { name: 'Help Center', url: '/help' },
    { name: 'Contact Us', url: '/contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">FT</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                futurefin
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
              Take control of your financial future with our comprehensive tracking and analytics platform. 
              Make informed decisions and achieve your financial goals.
            </p>
            
            {/* Contact info */}
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>contact@financetracker.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://example.com/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://example.com/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://example.com/cookies"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="https://example.com/security"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social links section */}
        <div className="border-t border-gray-300 dark:border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Connect With Us
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ name, icon: Icon, url, color }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 transform ${color} border border-gray-200 dark:border-gray-600`}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
              <span className="text-sm font-medium">Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-300 dark:border-gray-600 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center mb-2 md:mb-0">
              <span>futurefin &copy; 2025</span>
            </div>
            <div className="flex items-center">
              <span>Made with</span>
              <Heart size={16} className="mx-1 text-red-500 animate-pulse" />
              <span>for better financial health</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
    </footer>
  );
};

export default Footer;