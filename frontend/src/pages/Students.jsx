import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import StudentTable from "../partials/StudentTable";
import studentData from "../data/sample.json"; // Import JSON data

function Students() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState(studentData); // Set initial state with JSON data
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [editIndex, setEditIndex] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "", age: "" });
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update existing student
      const updatedStudents = [...students];
      updatedStudents[editIndex] = formData;
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      // Add new student
      setStudents((prevStudents) => [...prevStudents, formData]);
    }
    closeModal();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(students[index]);
    openModal();
  };

  const handleDelete = (index) => {
    setStudents(students.filter((_, i) => i !== index));
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
                Students
              </h1>
              <button
                onClick={openModal}
                className="btn bg-green-600 font-semibold text-white hover:bg-green-800 dark:bg-green-100 dark:text-green-800 dark:hover:bg-green-200"
              >
                Add Student
              </button>
            </div>

            {/* Students Table */}
            <StudentTable
              students={students}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:m-4 m-2">
                  <div className="flex justify-between items-baseline">
                    <h2 className="text-lg font-semibold mb-4">
                      {editIndex !== null ? "Edit Student" : "Add New Student"}
                    </h2>
                    <button
                      type="button"
                      className="bg-gray-400 rounded-md px-2 text-white"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </div>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          name="Fullname"
                          placeholder="Full Name"
                          className="rounded-md"
                          value={formData.Fullname}
                          onChange={handleChange}
                          required
                        />
                        <input
                          type="text"
                          name="Initname"
                          placeholder="Name with Initial"
                          className="rounded-md"
                          value={formData.Initname}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            className="rounded-md"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="rounded-md"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            className="rounded-md"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="rounded-md"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          className="rounded-md"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="rounded-md"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="md:col-span-2 flex justify-end items-center gap-4">
                        <button type="submit">
                          {editIndex !== null ? "Update" : "Save"}
                        </button>
                      </div>
                    </form>
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

export default Students;
