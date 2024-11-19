import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Swal from "sweetalert2"; // Import SweetAlert2
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);

  // Fetch events on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/events").then((response) => {
      setEvents(response.data);
    });
  }, []);

  // Handle adding new event
  const handleDateClick = (info) => {
    // Use SweetAlert2 to prompt the user for event details
    Swal.fire({
      title: "Add Event",
      input: "text",
      inputLabel: "Event Title",
      inputPlaceholder: "Enter the event title",
      showCancelButton: true,
      confirmButtonText: "Add Event",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newEvent = { title: result.value, start: info.dateStr };

        // Save the event to the server
        axios
          .post("http://localhost:5000/events", newEvent)
          .then(() => {
            setEvents([...events, newEvent]); // Update local state
            Swal.fire("Success", "Event added successfully!", "success");
          })
          .catch(() => Swal.fire("Error", "Failed to save event!", "error"));
      }
    });
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
                  Dashboard
                </h1>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <DashboardCard01 />
              <DashboardCard02 />
              <DashboardCard03 />
            </div>

            {/* Calendar */}
            <div className="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Calendar
              </h2>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                events={events} // Use state for events
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth", // Only month view
                }}
                dateClick={handleDateClick}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
