import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import StaffTable from "../partials/StaffTable";
import StaffData from "../data/staff.json"; // Import JSON data

function Staff() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Staffs, setStaffs] = useState(StaffData); // Set initial state with JSON data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    address: "",
    phone: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [viewDetails, setViewDetails] = useState(null); // Store full details of a clicked student

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      address: "",
      phone: "",
    });
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update existing Staff
      const updatedStaffs = [...Staffs];
      updatedStaffs[editIndex] = formData;
      setStaffs(updatedStaffs);
      setEditIndex(null);
    } else {
      // Add new Staff
      setStaffs((prevStaffs) => [...prevStaffs, formData]);
    }
    closeModal();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(Staffs[index]);
    openModal();
  };

  const handleDelete = (index) => {
    setStaffs(Staffs.filter((_, i) => i !== index));
  };

  const handleViewDetails = (index) => {
    setViewDetails(Staffs[index]); // Show full details of the selected student
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
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                Staffs
              </h1>
              <button
                onClick={openModal}
                className="btn bg-green-600 font-semibold text-white hover:bg-green-800 dark:bg-green-100 dark:text-green-800 dark:hover:bg-green-200"
              >
                Add Staff
              </button>
            </div>

            {/* Staffs Table */}
            <StaffTable
              Staffs={Staffs}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleViewDetails} // Pass the view function
            />

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg m-4"> {/* Adjusted modal size */}
                  <div className="flex justify-between items-baseline">
                    <h2 className="text-lg font-semibold mb-4">
                      {editIndex !== null ? "Edit Staff" : "Add New Staff"}
                    </h2>
                    <button
                      type="button"
                      className="bg-gray-400 rounded-md px-2 text-white"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    {/* Stacking inputs vertically */}
                    <div className="mb-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="w-full rounded-md"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full rounded-md"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full rounded-md"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        name="age"
                        placeholder="Age"
                        className="w-full rounded-md"
                        value={formData.age}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        className="w-full rounded-md"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        className="w-full rounded-md"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex justify-end items-center gap-4">
                      <button type="submit">
                        {editIndex !== null ? "Update" : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* View Student Details */}
            {viewDetails && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:m-4 m-2">
                  <h2 className="text-lg font-semibold mb-4">Student Details</h2>
                  <div className="mb-4">
                    <p><strong>Name:</strong> {viewDetails.firstName} {viewDetails.lastName}</p>
                    <p><strong>Email:</strong> {viewDetails.email}</p>
                    <p><strong>Age:</strong> {viewDetails.age}</p>
                    <p><strong>Address:</strong> {viewDetails.address}</p>
                    <p><strong>Phone:</strong> {viewDetails.phone}</p>
                  </div>
                  <button
                    onClick={() => setViewDetails(null)}
                    className="bg-gray-400 rounded-md px-4 py-2 text-white"
                  >
                    Close
                  </button>
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
