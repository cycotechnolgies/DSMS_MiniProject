import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./css/style.css";
import "./charts/ChartjsConfig";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Staff from "./pages/Staff";
import Payments from "./pages/Payments";
import Schedules from "./pages/Schedule";
import Exams from "./pages/Exams";
import Medical from "./pages/Medical";
import Renewal from "./pages/Renewal";
import StudentTable from "./partials/StudentTable";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import AddStaff from "./pages/forms/addStaff";
import Profiles from "./pages/Profile";

import Quiz from "./components/Quiz/Quiz";

import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <>
      <Toaster />
      <Routes>
        {/* <Route exact path="/login" element={<Navigate to="/login" replace />} />
        <Route
          exact
          path="/login"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        /> */}

        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/students" element={<Students />} />
        <Route exact path="/table" element={<StudentTable />} />
        <Route exact path="/staff" element={<Staff />} />
        <Route exact path="/exams" element={<Exams />} />
        <Route exact path="/Payments" element={<Payments />} />
        <Route exact path="/medical" element={<Medical />} />
        <Route exact path="/renew" element={<Renewal />} />
        <Route exact path="/class" element={<Schedules />} />
        {/* other routes */}
        <Route exact path="/staff/enroll" element={<AddStaff />} />

        <Route exact path="/quiz" element={<Quiz />} />
        <Route exact path="/profile" element={<Profiles />} />

        <Route path="/edit-staff/:id" element={<AddStaff />} />
      </Routes>
    </>
  );
}

export default App;
