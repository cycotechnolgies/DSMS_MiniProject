import React, { useState } from "react";

const InstructorDashboard = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Chalani",
      course: "Beginner Driving",
      progress: 85,
      strengths: ["Parking", "Signaling"],
      weaknesses: ["Lane Changes", "Braking"],
      feedback: [
        "Improving in handling tight spaces.",
        "Needs to work on smoother braking.",
      ],
      schedule: "Monday, Wednesday, Friday - 10 AM to 12 PM",
      attendance: true,
    },
    {
      id: 2,
      name: "Anjana",
      course: "Advanced Driving",
      progress: 70,
      strengths: ["Traffic Rule Adherence", "Merging"],
      weaknesses: ["Handling", "Reversing"],
      feedback: [
        "Good understanding of traffic rules.",
        "Needs practice in reversing maneuvers.",
      ],
      schedule: "Tuesday, Thursday - 9 AM to 11 AM",
      attendance: false,
    },
    {
      id: 3,
      name: "Kavindu",
      course: "Intermediate Driving",
      progress: 60,
      strengths: ["Smooth Turns", "Speed Control"],
      weaknesses: ["Reversing", "Parking"],
      feedback: [
        "Great improvement in maintaining speed.",
        "Needs practice on reversing accuracy.",
      ],
      schedule: "Monday, Wednesday, Friday - 1 PM to 3 PM",
      attendance: true,
    },
    // Additional students...
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [progressUpdate, setProgressUpdate] = useState("");
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleSearch = (id) => {
    const student = students.find((student) => student.id === id);
    setSelectedStudent(student);
  };

  const handleUpdateProgress = () => {
    if (!progressUpdate) return; // Don't update if no progress entered
    
    const updatedStudents = students.map((student) =>
      student.id === selectedStudent.id
        ? { ...student, progress: parseInt(progressUpdate) }
        : student
    );
    setStudents(updatedStudents);
    setSelectedStudent((prev) => ({
      ...prev,
      progress: parseInt(progressUpdate),
    }));
    setProgressUpdate(""); // Reset progress update input field
  };

  const handleAttendanceToggle = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, attendance: !student.attendance } : student
    );
    setStudents(updatedStudents);
  };

  const handleSendNotification = () => {
    alert("Notification sent to staff and admins!");
  };

  const handleEdit = (student) => {
    setEditing(true);
    setEditData({ ...student });
  };

  const handleSaveChanges = () => {
    const updatedStudents = students.map((student) =>
      student.id === editData.id ? editData : student
    );
    setStudents(updatedStudents);
    setEditing(false);
    setSelectedStudent(editData);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayInputChange = (field, index, value) => {
    setEditData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  return (
    <div className="bg-gradient-to-tr from-indigo-100 via-pink-100 to-yellow-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
        🚗 Student's Progress Tracker 🚗
      </h1>
      <p className="text-center text-gray-700 mb-8 text-lg">
        Manage student progress, view schedules, and send notifications.
      </p>

      {/* Search Input */}
      <div className="flex justify-left items-center mb-8">
        <input
          type="number"
          placeholder="Enter Student ID"
          onChange={(e) => handleSearch(parseInt(e.target.value, 10))}
          className="px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
        />
      </div>

      <div className="flex">
        {/* Students List */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mr-8">
          <div className="grid grid-cols-1 gap-8">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transform hover:scale-105 transition-transform"
              >
                <h2 className="text-2xl font-semibold text-gray-800">{student.name}</h2>
                <p className="text-gray-600 mt-2"><strong>📘 Course:</strong> {student.course}</p>
                <p className="text-gray-600 mt-2">
                  <strong>📊 Progress:</strong>{" "}
                  <span
                    className={`font-bold text-lg ${
                      student.progress >= 75 ? "text-green-500" : "text-yellow-500"
                    }`}
                  >
                    {student.progress}%
                  </span>
                </p>
                <button
                  onClick={() => setSelectedStudent(student)}
                  className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleEdit(student)}
                  className="mt-2 w-full px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                    Update Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Student Details */}
        {selectedStudent && !editing && (
          <div className="w-full sm:w-1/2 lg:w-2/3 bg-white rounded-xl shadow-lg p-8 border border-gray-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedStudent.name}'s Progress Details
            </h2>
            <p className="text-gray-700"><strong>📘 Course:</strong> {selectedStudent.course}</p>
            <p className="text-gray-700 mt-2">
              <strong>📊 Progress:</strong>{" "}
              <span
                className={`font-bold text-lg ${
                  selectedStudent.progress >= 75
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {selectedStudent.progress}%
              </span>
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">✅ Strengths:</h3>
              <ul className="mt-2 text-gray-700 list-disc list-inside">
                {selectedStudent.strengths.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">⚠️ Weaknesses:</h3>
              <ul className="mt-2 text-gray-700 list-disc list-inside">
                {selectedStudent.weaknesses.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">📝 Feedback:</h3>
              <ul className="mt-2 text-gray-700 list-disc list-inside">
                {selectedStudent.feedback.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">📅 Schedule:</h3>
              <p className="mt-2 text-gray-700">{selectedStudent.schedule}</p>
            </div>
            <div className="mt-6">
              <input
                type="number"
                placeholder="Update Progress"
                value={progressUpdate}
                onChange={(e) => setProgressUpdate(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full mb-4"
              />
              <button
                onClick={handleUpdateProgress}
                className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Update Progress
              </button>
            </div>
          
            <button
              onClick={handleSendNotification}
              className="mt-4 w-full py-3 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Send Notification to staff and admin
            </button>
          </div>
        )}

        {/* Edit Student Details */}
        {editing && (
          <div className="w-full sm:w-1/2 lg:w-2/3 bg-white rounded-xl shadow-lg p-8 border border-gray-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Edit {editData.name}'s Details
            </h2>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={editData.course}
              onChange={(e) => handleInputChange("course", e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Strengths:</h3>
              {editData.strengths.map((strength, index) => (
                <input
                  key={index}
                  type="text"
                  value={strength}
                  onChange={(e) =>
                    handleArrayInputChange("strengths", index, e.target.value)
                  }
                  className="w-full p-3 mb-2 border border-gray-300 rounded-lg"
                />
              ))}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Weaknesses:</h3>
              {editData.weaknesses.map((weakness, index) => (
                <input
                  key={index}
                  type="text"
                  value={weakness}
                  onChange={(e) =>
                    handleArrayInputChange("weaknesses", index, e.target.value)
                  }
                  className="w-full p-3 mb-2 border border-gray-300 rounded-lg"
                />
              ))}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Feedback:</h3>
              {editData.feedback.map((feedback, index) => (
                <input
                  key={index}
                  type="text"
                  value={feedback}
                  onChange={(e) =>
                    handleArrayInputChange("feedback", index, e.target.value)
                  }
                  className="w-full p-3 mb-2 border border-gray-300 rounded-lg"
                />
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleSaveChanges}
                className="py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="py-3 px-4 bg-gray-400 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;       