// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p className="mb-2">Finance Tracker &copy; 2025</p>
      <p>
        <a
          href="https://example.com/privacy"
          className="underline text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>{' '}
        |{' '}
        <a
          href="https://example.com/terms"
          className="underline text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
      </p>
    </footer>
  );
};

export default Footer;
