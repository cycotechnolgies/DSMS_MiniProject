import React, { useState, useEffect } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import Calendar from "../components/calander";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
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
              <Calendar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
