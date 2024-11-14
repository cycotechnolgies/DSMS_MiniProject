import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

function Staff() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const sampleStaff = [
    { name: "John Doe", email: "john.doe@example.com", age: 30, position: "Manager" },
    { name: "Jane Smith", email: "jane.smith@example.com", age: 28, position: "Developer" },
    { name: "Michael Brown", email: "michael.brown@example.com", age: 35, position: "Designer" },
  ];

  const openModal = (staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
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
                  Staff Members
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Add staff button */}
                <button
                  className="btn bg-green-600 text-white hover:bg-green-800 dark:bg-green-100 dark:text-green-800 dark:hover:bg-green-200"
                >
                  Add Staff
                </button>
              </div>
            </div>

            {/* Staff Table */}
            <div className="overflow-x-auto mt-8">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                    <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                    <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Age</th>
                    <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleStaff.map((staff, index) => (
                    <tr key={index} className="border-b">
                      <td
                        onClick={() => openModal(staff)}
                        className="py-2 px-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer dark:text-blue-400 dark:hover:text-blue-600"
                      >
                        {staff.name}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">{staff.email}</td>
                      <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">{staff.age}</td>
                      <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">{staff.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Profile Modal */}
            {isModalOpen && selectedStaff && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
                  <h2 className="text-lg font-semibold mb-4">{selectedStaff.name}'s Profile</h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedStaff.email}</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedStaff.age}</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedStaff.position}</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Staff;
