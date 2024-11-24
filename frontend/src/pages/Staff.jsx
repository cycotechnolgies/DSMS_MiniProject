import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import StaffTable from "../partials/StaffTable";

function Staff() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [Staffs, setStaffs] = useState([]); // Start with an empty array for staff
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/user/staff");
        if (!response.ok) {
          throw new Error("Failed to fetch staff data");
        }
        const data = await response.json();

        // Transform data to fit table structure
        const formattedData = data.map((staff) => ({
          id: staff._id.$oid || staff._id,
          name: `${staff.firstName} ${staff.lastName}`,
          email: staff.email,
          nic: staff.nic,
          contactNo: staff.contactNo,
        }));

        setStaffs(formattedData); // Set transformed data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
    console.log("Staff data", Staffs);
  }, []);

  if (loading)
    return <div className="text-center mt-4">Loading staff data...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                Staff
              </h1>
            </div>
            {/* Pass the fetched Staffs to the table */}
            <StaffTable Staffs={Staffs} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Staff;
