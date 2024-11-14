import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import studentPhoto from "../images/student_photo.jpg"; // Replace with an actual image path

function Medical() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data for medical reports
  const studentMedicalReports = [
    { 
      name: "Lakmina Sadaruwan", 
      age: 20, 
      bloodType: "O+",
      lastCheckup: "2024-10-15", 
      healthStatus: "Good", 
      allergies: "None",
      medications: "None",
      notes: "N/A"
    },
    { 
      name: "Bob Williams", 
      age: 22, 
      bloodType: "A-", 
      lastCheckup: "2024-09-01", 
      healthStatus: "Moderate", 
      allergies: "Penicillin",
      medications: "Ibuprofen",
      notes: "Regular exercise recommended"
    },
  ];

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
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                Student Medical Reports
              </h1>
            </div>

            {/* Medical Report Section */}
            <section className="mb-8">
              {studentMedicalReports.map((report, index) => (
                <div key={index} className="border rounded-lg p-6 mb-6 bg-white dark:bg-gray-800 shadow-md">
                  <div className="flex items-center mb-4">
                    <img 
                      src={studentPhoto} // Use actual student's photo if available
                      alt="Student Profile"
                      className="w-24 h-24 rounded-full mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{report.name}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Age: {report.age}</p>
                    </div>
                  </div>
                  <div className="text-gray-800 dark:text-gray-200">
                    <p><strong>Blood Type:</strong> {report.bloodType}</p>
                    <p><strong>Last Checkup:</strong> {report.lastCheckup}</p>
                    <p><strong>Health Status:</strong> {report.healthStatus}</p>
                    <p><strong>Allergies:</strong> {report.allergies}</p>
                    <p><strong>Medications:</strong> {report.medications}</p>
                    <p><strong>Notes:</strong> {report.notes}</p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Medical;
