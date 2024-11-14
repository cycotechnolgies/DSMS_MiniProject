import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import creditCardImage from "../images/credit_card_PNG22.jpg"; // Adjust the path if needed

function Billing() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data for payment records
  const studentPayments = [
    { method: "Credit Card", amount: "$500", date: "2024-11-01", status: "Paid" },
    { method: "PayPal", amount: "$300", date: "2024-10-15", status: "Pending" },
  ];

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

            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                Billing
              </h1>
            </div>

            {/* Image below Billing text */}
            <div className="mb-8 flex justify-right">
              <img 
                src={creditCardImage} 
                alt="Credit Card" 
                className="w-full max-w-[300px] h-auto" 
              />
            </div>

            {/* Student Billing Section */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Student Billing Payment Methods
              </h2>
              <div className="flex gap-4 items-center">
                <button className="btn bg-blue-600 text-white hover:bg-blue-800">
                  Credit Card
                </button>
                <button className="btn bg-blue-600 text-white hover:bg-blue-800">
                  PayPal
                </button>
                <button className="btn bg-blue-600 text-white hover:bg-blue-800">
                  Bank Transfer
                </button>
                <button className="btn bg-blue-600 text-white hover:bg-blue-800">
                  Cash
                </button>
              </div>
            </section>

            {/* Student Payment Records Table */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Student Payment Records
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Method
                      </th>
                      <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Amount
                      </th>
                      <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Date
                      </th>
                      <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentPayments.map((payment, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">
                          {payment.method}
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">
                          {payment.amount}
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">
                          {payment.date}
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">
                          {payment.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Billing;
