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
      <Routes>
        <Route
          exact
          path="/"
          element={<Navigate to="/login" replace />}
        />
        <Route
          exact
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/students" element={<Students />} />
        <Route exact path="/table" element={<StudentTable />} />
        <Route exact path="/staff" element={<Staff />} />
        <Route exact path="/exams" element={<Exams />} />
        <Route exact path="/Payments" element={<Payments />} />
        <Route exact path="/medical" element={<Medical />} />
        <Route exact path="/renew" element={<Renewal />} />
        <Route exact path="/class" element={<Schedules />} />
      </Routes>
    </>
  );
}

export default App;
