import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Swal from "sweetalert2";
import axios from "axios";

function Calendar() {
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/events").then((response) => {
      setEvents(response.data);
    });
  }, []);

  // Add an event
  const handleDateClick = (info) => {
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

        axios
          .post("http://localhost:5000/api/events", newEvent)
          .then((response) => {
            setEvents([...events, response.data]);
            Swal.fire("Success", "Event added successfully!", "success");
          })
          .catch(() => Swal.fire("Error", "Failed to add event!", "error"));
      }
    });
  };

  // Delete an event
  const handleEventClick = (info) => {
    Swal.fire({
      title: "Delete Event?",
      text: `Are you sure you want to delete "${info.event.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/events/${info.event.id}`)
          .then(() => {
            setEvents(events.filter((event) => event._id !== info.event.id));
            Swal.fire("Deleted!", "The event has been deleted.", "success");
          })
          .catch(() => Swal.fire("Error", "Failed to delete event!", "error"));
      }
    });
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events.map((event) => ({ ...event, id: event._id }))}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </div>
  );
}

export default Calendar;
