import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaWhatsapp, FaPhone } from "react-icons/fa";
import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo and Name in One Line */}
        <div className="flex items-center space-x-3">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="DS Logo" />
          <span className="text-lg font-semibold">Driving School</span>
        </div>

        {/* Address */}
        <div className="text-center md:text-left text-gray-400">
          <p>1234 Elm Street, Suite 500</p>
          <p>New York, NY 10001, USA</p>
          <p>Email: contact@DrivingSchool.com</p>
          <p className="flex items-center justify-center md:justify-start space-x-2">
            <a href="https://wa.me/94775458904" target="_blank" rel="noopener noreferrer">
              <FaPhone className="text-lg text-green-400 cursor-pointer" />
            </a>
            <span>+94 77 545 8904</span>
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-blue-400" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-blue-300" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl hover:text-blue-500" />
          </a>
          <a href="https://wa.me/94775458904" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-2xl hover:text-green-400" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; 2024 DriveSchool. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;