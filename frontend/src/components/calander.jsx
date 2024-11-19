import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  return (
    <FullCalendar
      plugins={dayGridPlugin}
      initialView="dayGridMonth"
      events={[
        { title: "Event 1", date: "2024-11-18" },
        { title: "Event 2", date: "2024-11-19" },
      ]}
      selectable={true} // Enables date selection
      eventClick={(info) => alert(`Event: ${info.event.title}`)}
      dateClick={(info) => alert(`Date: ${info.dateStr}`)}
    />
  );
};

export default Calendar;
