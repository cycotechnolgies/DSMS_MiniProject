import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // For route params and navigation
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

function AddStaff() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchStaffDetails = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:4000/api/user/get-user/${id}`
          );
          const staff = response.data;
          if (staff.birthday) {
            const formattedDate = new Date(staff.birthday)
              .toISOString()
              .split("T")[0];
            setValue("birthday", formattedDate);
          }

          // Set other fields
          for (const key in staff) {
            if (key !== "birthday") {
              setValue(key, staff[key]);
            }
          }
        } catch (error) {
          console.error("Error fetching staff details:", error);
          toast.error("Failed to load staff details");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchStaffDetails();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (id) {
        // Edit staff logic
        const response = await axios.put(
          `http://localhost:4000/api/user/edit-user/${id}`,
          data
        );
        toast.success(response.data.message || "Staff updated successfully");
        navigate("/staff");
      } else {
        // Add staff logic
        if (!validator.isEmail(data.email)) {
          setError("email", { message: "Invalid email format" });
          return;
        }

        if (data.password !== data.confirmPassword) {
          setError("confirmPassword", { message: "Passwords do not match" });
          return;
        }

        if (!validator.isMobilePhone(data.contactNo, "si-LK")) {
          setError("contactNo", {
            message: "Invalid Sri Lankan contact number",
          });
          return;
        }

        const response = await axios.post(
          "http://localhost:4000/api/user/add",
          data
        );
        toast.success(response.data.message || "Staff added successfully");
        navigate("/staff");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during the operation";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              {id ? "Edit Staff" : "Add Staff"}
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                {/* Birthday */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Birthday
                  </label>
                  <input
                    type="date"
                    {...register("birthday", {
                      required: "Birthday is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.birthday && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.birthday.message}
                    </p>
                  )}
                </div>

                {/* NIC Number */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    NIC Number
                  </label>
                  <input
                    type="text"
                    {...register("nic", { required: "NIC number is required" })}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter NIC number"
                    maxLength={12}
                  />
                  {errors.nic && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nic.message}
                    </p>
                  )}
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Contact No
                  </label>
                  <input
                    type="tel"
                    {...register("contactNo", {
                      required: "Contact number is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter contact number"
                    maxLength={10}
                  />
                  {errors.contactNo && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactNo.message}
                    </p>
                  )}
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    WhatsApp No
                  </label>
                  <input
                    type="tel"
                    {...register("whatsappNo", {
                      required: "WhatsApp number is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter WhatsApp number"
                    maxLength={10}
                  />
                  {errors.whatsappNo && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.whatsappNo.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Permanent address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* User Type */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    User Type
                  </label>
                  <select
                    {...register("userType", {
                      required: "User type is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select User Type</option>
                    <option value="staff">Staff</option>
                    <option value="instructor">Instructor</option>
                    <option value="sales">Sales</option>
                  </select>
                  {errors.userType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.userType.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                {!id && ( // Show password fields only in add mode
                  <>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter password"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                        })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Confirm password"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end items-center gap-4">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${
                    isLoading
                      ? "bg-gray-400"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white py-2 px-4 rounded`}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
            <Toaster />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddStaff;
