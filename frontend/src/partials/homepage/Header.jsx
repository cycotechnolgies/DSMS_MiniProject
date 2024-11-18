import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-2 text-lg">
          Get to know who we are, what we stand for, and how we are transforming
          education.
        </p>
      </div>
    </header>
  );
};

export default Header;
