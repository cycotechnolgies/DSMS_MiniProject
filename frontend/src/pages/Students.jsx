import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

function Students() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents((prevStudents) => [...prevStudents, formData]);
    setFormData({ name: "", email: "", age: "" }); // Clear form
    closeModal();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Students
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Add view button */}
                <button
                  onClick={openModal}
                  className="btn bg-green-600 text-white hover:bg-green-800 dark:bg-green-100 dark:text-green-800 dark:hover:bg-green-200"
                >
                  Add Student
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto mt-8">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                    <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                    <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">{student.name}</td>
                      <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">{student.email}</td>
                      <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">{student.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
                  <h2 className="text-lg font-semibold mb-4">Add New Student</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white hover:bg-green-800 rounded"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Students;
