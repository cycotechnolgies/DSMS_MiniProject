import React from "react";

const DashboardCard = ({ title, value, icon }) => (
  <div className="flex flex-col justify-between bg-white shadow rounded-lg p-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {title}
      </h2>
    </div>
    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      {value}
    </p>
  </div>
);

const Home = () => {
  const studentCount = 150; // Example data
  const totalRevenue = "$20,000"; // Example data
  const pendingRequestsCount = 5; // Example data

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <DashboardCard
        title="Total Students"
        value={studentCount}
        icon={<i className="fas fa-user-graduate text-blue-500 h-6 w-6" />} // Example icon, use your preferred icon here
      />
      <DashboardCard
        title="Total Revenue"
        value={totalRevenue}
        icon={<i className="fas fa-dollar-sign text-green-500 h-6 w-6" />} // Example icon, use your preferred icon here
      />
      <DashboardCard
        title="Pending Requests"
        value={pendingRequestsCount}
        icon={<i className="fas fa-clock text-yellow-500 h-6 w-6" />} // Example icon, use your preferred icon here
      />
    </div>
  );
};

export default Home;
