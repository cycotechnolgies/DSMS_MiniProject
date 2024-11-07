import React from "react";
import { CircleDollarSign } from "lucide-react";

function DashboardCard02() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 py-5 flex gap-4 items-center divide-x-2">
        <div className="w-16 h-16 bg-red-600 rounded-full flex justify-center items-center text-white text-2xl">
          <CircleDollarSign />
        </div>
        <div className="px-4">
          <header className="flex justify-between items-start">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Pending Payments
            </h2>
          </header>
          <div className="flex items-start">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
              47
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard02;
