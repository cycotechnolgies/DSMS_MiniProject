import React from 'react';

const Signup = () => {
  // Implement signup logic here
return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name:</label>
                    <input type="text" id="name" name="name" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input type="email" id="email" name="email" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="birthday" className="block text-gray-700">Birthday:</label>
                    <input type="date" id="birthday" name="birthday" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="mobile" className="block text-gray-700">Mobile Number:</label>
                    <input type="tel" id="mobile" name="mobile" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign Up</button>
            </form>
        </div>
    </div>
);
};

export default Signup;