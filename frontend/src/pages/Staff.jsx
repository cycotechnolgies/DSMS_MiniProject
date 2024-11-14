import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

function Staff() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newStaff, setNewStaff] = useState({ name: "", email: "", age: "", position: "" });
  const [editStaff, setEditStaff] = useState({ name: "", email: "", age: "", position: "" });
  const [staffList, setStaffList] = useState([
    { name: "John Doe", email: "john.doe@example.com", age: 30, position: "Manager" },
    { name: "Jane Smith", email: "jane.smith@example.com", age: 28, position: "Developer" },
    { name: "Michael Brown", email: "michael.brown@example.com", age: 35, position: "Designer" },
  ]);

  const openProfileModal = (staff) => {
    setSelectedStaff(staff);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedStaff(null);
  };

  const openAddStaffModal = () => {
    setIsAddStaffModalOpen(true);
  };

  const closeAddStaffModal = () => {
    setIsAddStaffModalOpen(false);
    setNewStaff({ name: "", email: "", age: "", position: "" });
  };

  const openEditStaffModal = (staff) => {
    setEditStaff(staff);  // Set the selected staff to be edited
    setIsEditStaffModalOpen(true);
  };

  const closeEditStaffModal = () => {
    setIsEditStaffModalOpen(false);
    setEditStaff({ name: "", email: "", age: "", position: "" });
  };

  const handleAddStaffChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditStaffChange = (e) => {
    const { name, value } = e.target;
    setEditStaff((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    setStaffList((prevList) => [...prevList, newStaff]);
    closeAddStaffModal();
  };

  const handleEditStaffSubmit = (e) => {
    e.preventDefault();
    setStaffList((prevList) =>
      prevList.map((staff) =>
        staff.email === editStaff.email ? editStaff : staff // Update staff by email
      )
    );
    closeEditStaffModal();
  };

  const handleDeleteStaff = (email) => {
    setStaffList((prevList) => prevList.filter((staff) => staff.email !== email)); // Delete by email
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
                  onClick={openAddStaffModal}
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
                    <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map((staff, index) => (
                    <tr key={index} className="border-b">
                      <td
                        onClick={() => openProfileModal(staff)}
                        className="py-2 px-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer dark:text-blue-400 dark:hover:text-blue-600"
                      >
                        {staff.name}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">{staff.email}</td>
                      <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">{staff.age}</td>
                      <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">{staff.position}</td>
                      <td className="py-2 px-4 text-sm">
                        <button
                          onClick={() => openEditStaffModal(staff)}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteStaff(staff.email)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Profile Modal */}
            {isProfileModalOpen && selectedStaff && (
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
                      onClick={closeProfileModal}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add Staff Modal */}
            {isAddStaffModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
                  <h2 className="text-lg font-semibold mb-4">Add New Staff</h2>
                  <form onSubmit={handleAddStaffSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newStaff.name}
                        onChange={handleAddStaffChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={newStaff.email}
                        onChange={handleAddStaffChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={newStaff.age}
                        onChange={handleAddStaffChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
                      <input
                        type="text"
                        name="position"
                        value={newStaff.position}
                        onChange={handleAddStaffChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded"
                      >
                        Add Staff
                      </button>
                      <button
                        type="button"
                        onClick={closeAddStaffModal}
                        className="ml-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Staff Modal */}
            {isEditStaffModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
                  <h2 className="text-lg font-semibold mb-4">Edit Staff</h2>
                  <form onSubmit={handleEditStaffSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editStaff.name}
                        onChange={handleEditStaffChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editStaff.email}
                        onChange={handleEditStaffChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={editStaff.age}
                        onChange={handleEditStaffChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
                      <input
                        type="text"
                        name="position"
                        value={editStaff.position}
                        onChange={handleEditStaffChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded"
                      >
                        Update Staff
                      </button>
                      <button
                        type="button"
                        onClick={closeEditStaffModal}
                        className="ml-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                      >
                        Cancel
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

export default Staff;
