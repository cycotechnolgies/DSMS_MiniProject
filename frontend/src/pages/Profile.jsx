import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

function Profile() {
  const studentList = [
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      age: 20,
      course: "Computer Science",
      index: "S12345",
      address: "123 Maple St, Cityville",
      marks: { math: 85, science: 90, history: 78 },
      medicalReport: "All clear",
      profilePicture: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Williams",
      email: "bob.williams@example.com",
      age: 22,
      course: "Electrical Engineering",
      index: "S67890",
      address: "456 Oak St, Townsville",
      marks: { math: 88, science: 85, history: 92 },
      medicalReport: "No issues reported",
      profilePicture: "https://via.placeholder.com/100",
    },
  ];

  const staffList = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      age: 30,
      position: "Manager",
      index: "ST1001",
      address: "789 Pine St, Metropolis",
      medicalReport: "No issues reported",
      profilePicture: "https://via.placeholder.com/100",
    },
    // Additional staff data as needed
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold">Student Profiles</h1>
            </div>
            <div className="mt-4">
              {studentList.map((student, index) => (
                <div key={index} className="mb-4">
                  <button className="text-lg font-semibold text-blue-600" onClick={() => handleProfileClick(student)}>
                    {student.name}
                  </button>
                </div>
              ))}
            </div>
            <div className="sm:flex sm:justify-between sm:items-center mb-8 mt-12">
              <h1 className="text-2xl md:text-3xl font-bold">Staff Profiles</h1>
            </div>
            <div className="mt-4">
              {staffList.map((staff, index) => (
                <div key={index} className="mb-4">
                  <button className="text-lg font-semibold text-blue-600" onClick={() => handleProfileClick(staff)}>
                    {staff.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
            <img src={selectedProfile.profilePicture} alt="Profile" className="mb-4 rounded-full w-24 h-24" />
            <p><strong>Name: </strong>{selectedProfile.name}</p>
            <p><strong>Email: </strong>{selectedProfile.email}</p>
            <p><strong>Age: </strong>{selectedProfile.age}</p>
            <p><strong>Index: </strong>{selectedProfile.index}</p>
            <p><strong>Address: </strong>{selectedProfile.address}</p>
            <p><strong>Medical Report: </strong>{selectedProfile.medicalReport}</p>
            {selectedProfile.marks && (
              <div>
                <strong>Marks:</strong>
                <ul>
                  {Object.entries(selectedProfile.marks).map(([subject, mark], i) => (
                    <li key={i}>{subject}: {mark}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedProfile.course && <p><strong>Course: </strong>{selectedProfile.course}</p>}
            {selectedProfile.position && <p><strong>Position: </strong>{selectedProfile.position}</p>}
            <div className="mt-4 text-right">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
