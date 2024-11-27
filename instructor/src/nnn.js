import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const InstructorDashboard = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Chalani",
      course: "Beginner Driving",
      progress: 85,
      attendanceDates: ["2024-11-01", "2024-11-03", "2024-11-10"], // Example dates
    },
    {
      id: 2,
      name: "Anjana",
      course: "Advanced Driving",
      progress: 70,
      attendanceDates: ["2024-11-05", "2024-11-07"], // Example dates
    },
    {
      id: 3,
      name: "Kavindu",
      course: "Intermediate Driving",
      progress: 60,
      attendanceDates: ["2024-11-02", "2024-11-09", "2024-11-11"], // Example dates

      
    },
    {
        id: 4,
        name: "Jayani",
        course: "Intermediate Driving",
        progress: 60,
        attendanceDates: ["2024-11-02", "2024-11-09", "2024-11-11"], // Example dates
  
        
      },
      {
        id: 5,
        name: "Ranula",
        course: "Intermediate Driving",
        progress: 60,
        attendanceDates: ["2024-11-02", "2024-11-09", "2024-11-11"], // Example dates
  
        
      },
      {
        id: 6,
        name: "Pawan",
        course: "Intermediate Driving",
        progress: 60,
        attendanceDates: ["2024-11-02", "2024-11-09", "2024-11-11"], // Example dates
  
        
      },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const tileContent = ({ date, view }) => {
    if (view === "month" && selectedStudent) {
      const formattedDate = date.toISOString().split("T")[0];
      if (selectedStudent.attendanceDates.includes(formattedDate)) {
        return <span className="text-green-500 font-bold">✔</span>;
      }
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-tr from-indigo-100 via-pink-100 to-yellow-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
        🚗 Instructor Dashboard 🚗
      </h1>

      {/* Students List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transform hover:scale-105 transition-transform"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {student.name}
            </h2>
            <p className="text-gray-600 mt-2">
              <strong>📘 Course:</strong> {student.course}
            </p>
            <button
              onClick={() => setSelectedStudent(student)}
              className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              View Attendance
            </button>
          </div>
        ))}
      </div>

      {/* Attendance Calendar */}
      {selectedStudent && (
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Attendance for {selectedStudent.name}
          </h2>
          <p className="text-gray-700 mb-4">
            <strong>📘 Course:</strong> {selectedStudent.course}
          </p>
          <Calendar
            tileContent={tileContent}
            className="mx-auto border rounded-lg shadow-md"
          />
          <button
            onClick={() => setSelectedStudent(null)}
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
