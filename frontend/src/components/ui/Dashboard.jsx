// Import statements for react-router-dom
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CarTaxiFront,
  Gauge,
  Menu,
  User,
  Users,
  BadgeDollarSign,
  HeartPulse,
  CalendarCheck2,
  BookOpenCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useState, useRef, useEffect } from "react";

// Import your content components
import Home from "./Home";
import Students from "./Students";
import Staff from "./Staff";
import Payments from "./Payments";
import Medical from "./Medical";
import Schedules from "./Schedules";
import Exams from "./Exams";

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home"); // Track active nav item
  const sidebarRef = useRef(null);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <Home />;
      case "Students":
        return <Students />;
      case "Staff":
        return <Staff />;
      case "Payments":
        return <Payments />;
      case "Medical":
        return <Medical />;
      case "Schedules":
        return <Schedules />;
      case "Exams":
        return <Exams />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-20 w-[280px] transform bg-white dark:bg-gray-900 lg:static lg:block lg:w-[280px] lg:translate-x-0 lg:bg-gray-100/40 lg:dark:bg-gray-800/40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:shrink-0 lg:border-r`}
      >
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link to="#" className="flex items-center gap-2 font-semibold">
              <CarTaxiFront />
              <p className="font-bold">DSMS</p>
              <span className="sr-only">DSMS</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <button
                onClick={() => setActiveTab("Home")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Gauge />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("Students")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <User />
                Students
              </button>
              <button
                onClick={() => setActiveTab("Staff")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Users />
                Staff
              </button>
              <button
                onClick={() => setActiveTab("Payments")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <BadgeDollarSign />
                Payments
              </button>
              <button
                onClick={() => setActiveTab("Medical")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <HeartPulse />
                Medical
              </button>
              <button
                onClick={() => setActiveTab("Schedules")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <CalendarCheck2 />
                Schedules
              </button>
              <button
                onClick={() => setActiveTab("Exams")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <BookOpenCheck />
                Exams
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>

          {/* Spacer div to push DropdownMenu to the end */}
          <div className="flex-1"></div>

          {/* Dropdown Menu aligned to the right */}
          <DropdownMenu className="ml-auto">
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-4 md:p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
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
              Send Notification
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
                className="py-3 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
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
