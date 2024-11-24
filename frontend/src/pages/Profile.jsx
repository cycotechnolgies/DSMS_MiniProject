import React from "react";

const Profiles = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Main Container */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white py-4 px-6">
            <h1 className="text-xl font-semibold">Account Settings</h1>
          </div>
          <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-100 p-4">
              {/* Profile Section */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-300">
                  {/* Placeholder for Profile Image */}
                </div>
                <h2 className="mt-4 text-lg font-semibold">Nathaniel Poole</h2>
                <p className="text-gray-500">Microsoft Inc.</p>
              </div>
              {/* Stats Section */}
              <div className="mt-6">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Opportunities applied</span>
                  <span className="font-semibold text-blue-600">32</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Opportunities won</span>
                  <span className="font-semibold text-green-600">24</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Current opportunities</span>
                  <span className="font-semibold text-orange-600">6</span>
                </div>
              </div>
              {/* Profile Link */}
              <div className="mt-6 text-center">
                <a
                  href="#"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  View Public Profile
                </a>
                <p className="mt-2 text-sm text-gray-500">
                  http://app.sitehere.com
                </p>
              </div>
            </div>
            {/* Main Content */}
            <div className="w-3/4 p-6">
              {/* Tabs */}
              <div className="flex border-b mb-6">
                <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">
                  Account Settings
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
                  Company Settings
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
                  Documents
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
                  Billing
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
                  Notifications
                </button>
              </div>
              {/* Form */}
              <form>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full mt-1 p-2 border rounded"
                      placeholder="Nathaniel"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full mt-1 p-2 border rounded"
                      placeholder="Poole"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="w-full mt-1 p-2 border rounded"
                      placeholder="+1800-000"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full mt-1 p-2 border rounded"
                      placeholder="nathaniel.poole@microsoft.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full mt-1 p-2 border rounded"
                      placeholder="Bridgeport"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-gray-700">
                      State/County
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="w-full mt-1 p-2 border rounded"
                      placeholder="WA"
                    />
                  </div>
                  <div>
                    <label htmlFor="postcode" className="block text-gray-700">
                      Postcode
                    </label>
                    <input
                      type="text"
                      id="postcode"
                      className="w-full mt-1 p-2 border rounded"
                      placeholder="13505"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      className="w-full mt-1 p-2 border rounded"
                      placeholder="United States"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
