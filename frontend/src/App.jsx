import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Staff from "./pages/Staff";
import Payments from "./pages/Payments";
import Schedules from "./pages/Schedule";
import Exams from "./pages/Exams";
import Medical from "./pages/Medical";
import Renewal from "./pages/Renewal";
import StudentTable from "./partials/StudentTable";
import AddStaff from "./pages/forms/addStaff";
import HomePage from "./pages/HomePage";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Toaster />
      <Routes>
        {/* Main Routes */}
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/students" element={<Students />} />
        <Route exact path="/table" element={<StudentTable />} />
        <Route exact path="/Staff" element={<Staff />} />
        <Route exact path="/exams" element={<Exams />} />
        <Route exact path="/payment" element={<Payments />} />
        <Route exact path="/medical" element={<Medical />} />
        <Route exact path="/renew" element={<Renewal />} />
        <Route exact path="/class" element={<Schedules />} />

        {/* Sub Routes for FORMS */}
        <Route exact path="/Staff/add" element={<AddStaff />} />
      </Routes>
    </>
  );
}

export default App;
