import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import studentData from "../data/sample.json"; // Import JSON data

function Students() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState(studentData); // Initialize with JSON data
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    fullname: "",
    Initname: "",
    dob: "",
    age: "",
    nic: "",
    mobile: "",
    address: "",
    whatsapp: "",
    email: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null); // To store the selected student's full details

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      firstname: "",
      lastname: "",
      fullname: "",
      Initname: "",
      dob: "",
      age: "",
      nic: "",
      mobile: "",
      address: "",
      whatsapp: "",
      email: ""
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
      // Update existing student
      const updatedStudents = [...students];
      updatedStudents[editIndex] = { ...formData };
      setStudents(updatedStudents);
    } else {
      // Add new student
      setStudents((prevStudents) => [...prevStudents, { ...formData }]);
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

  const handleSelectStudent = (student) => {
    setSelectedStudent(student); // Set selected student to show full details
  };

  const handleDeselectStudent = () => {
    setSelectedStudent(null); // Deselect student to hide details
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Students
              </h1>
              <button
                onClick={openModal}
                className="btn bg-green-600 font-semibold text-white hover:bg-green-800"
              >
                Add Student
              </button>
            </div>

            {/* List of Students with names */}
            <div className="space-y-6">
              {students.map((student, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg shadow-md bg-white"
                >
                  <div className="flex justify-between items-center">
                    <h3
                      onClick={() => handleSelectStudent(student)}
                      className="cursor-pointer text-xl font-semibold text-blue-500"
                    >
                      {student.fullname}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="btn bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="btn bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {/* Show student details only if selected */}
                  {selectedStudent === student && (
                    <div className="mt-4 space-y-4">
                      {Object.keys(student).map((key, i) => (
                        <div key={i}>
                          <strong className="block">{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                          <p>{student[key]}</p>
                        </div>
                      ))}
                      <button
                        onClick={handleDeselectStudent}
                        className="btn bg-gray-300 text-black hover:bg-gray-500 mt-4"
                      >
                        Hide Details
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal for Adding/Editing Student */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
                  <div className="flex justify-between items-baseline">
                    <h2 className="text-lg font-semibold">
                      {editIndex !== null ? "Edit Student" : "Add New Student"}
                    </h2>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-red-500"
                    >
                      Close
                    </button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {Object.keys(formData).map((field, index) => (
                        <div key={index}>
                          <label className="block font-semibold text-sm">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <input
                            type="text"
                            name={field}
                            className="rounded-md border w-full p-2"
                            value={formData[field]}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="btn bg-green-600 text-white hover:bg-green-800"
                      >
                        {editIndex !== null ? "Update" : "Save"}
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
