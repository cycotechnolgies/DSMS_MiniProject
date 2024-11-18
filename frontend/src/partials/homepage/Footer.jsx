import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>
          &copy; 2024 [LMS Name]. All Rights Reserved. Follow us on{" "}
          <a href="#" className="text-yellow-300 underline">
            LinkedIn
          </a>
          ,{" "}
          <a href="#" className="text-yellow-300 underline">
            Twitter
          </a>
          , and{" "}
          <a href="#" className="text-yellow-300 underline">
            Facebook
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
