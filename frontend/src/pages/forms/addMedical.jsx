import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";

function AddMedical() {
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
		<div className='flex h-screen overflow-hidden'>
			{/* Content area */}
			<div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
				<main className='grow'>
					<div className='px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto'>
						<h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>
							{id ? "Edit Medical" : "Add Medical"}
						</h1>

						<form
							onSubmit={handleSubmit(onSubmit)}
							noValidate
							className='space-y-4'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								{/* First Name */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										First Name
									</label>
									<input
										type='text'
										{...register("firstName", {
											required: "First name is required",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
										placeholder='Saman'
									/>
									{errors.firstName && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.firstName.message}
										</p>
									)}
								</div>

								{/* Last Name */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Last Name
									</label>
									<input
										type='text'
										{...register("lastName", {
											required: "Last name is required",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
										placeholder='Enter last name'
									/>
									{errors.lastName && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.lastName.message}
										</p>
									)}
								</div>

								{/* full Name */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Full Name
									</label>
									<input
										type='text'
										{...register("fullName", {
											required: "Full name is required",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
										placeholder='Enter full name'
									/>
									{errors.fullName && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.fullName.message}
										</p>
									)}
								</div>

								{/* Birthday */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Birthday
									</label>
									<input
										type='date'
										{...register("birthday", {
											required: "Birthday is required",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
									/>
									{errors.birthday && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.birthday.message}
										</p>
									)}
								</div>

								{/* NIC Number */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										NIC Number
									</label>
									<input
										type='text'
										{...register("nic", {
											required: "NIC number is required",
											validate: (value) =>
												validator.isIdentityCard(value, "LK") ||
												"Invalid Identity Card Number",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
										placeholder='Enter NIC number'
										maxLength={12}
									/>
									{errors.nic && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.nic.message}
										</p>
									)}
								</div>
								{/* Gender */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Gender
									</label>
									<select
										{...register("gender", {
											required: "Gender is required",
										})}
										className='w-full p-2 border border-gray-300 rounded'>
										<option value=''>Select Gender</option>
										<option value='Male'>Male</option>
										<option value='Female'>Female</option>
									</select>
									{errors.gender && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.gender.message}
										</p>
									)}
								</div>

								{/* Contact Number */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Contact No
									</label>
									<input
										type='tel'
										{...register("contactNo", {
											required: "Contact number is required",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
										placeholder='Enter contact number'
										maxLength={10}
									/>
									{errors.contactNo && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.contactNo.message}
										</p>
									)}
								</div>

								{/* WhatsApp Number */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										WhatsApp No
									</label>
									<input
										type='tel'
										{...register("whatsappNo", {
											required: "WhatsApp number is required",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
										placeholder='Enter WhatsApp number'
										maxLength={10}
									/>
									{errors.whatsappNo && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.whatsappNo.message}
										</p>
									)}
								</div>

								{/* Address */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Address
									</label>
									<input
										type='text'
										{...register("address", {
											required: "Address is required",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
										placeholder='Permanent address'
									/>
									{errors.address && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.address.message}
										</p>
									)}
								</div>

								{/* Vehical Class */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Vehical Class
									</label>
									<select
										{...register("vehiClass", {
											required: "Vehical Class is required",
										})}
										className='w-full p-2 border border-gray-300 rounded'>
										<option value=''>Select Vehical Class</option>
										<option value='Light Vehical'>Light Vehical</option>
										<option value='Heavy Vehical'>Heavy Vehical</option>
									</select>
									{errors.vehiClass && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.vehiClass.message}
										</p>
									)}
								</div>
								{/* Institute */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Medical Institute
									</label>
									<select
										{...register("institute", {
											required: "Medical Institute is required",
										})}
										className='w-full p-2 border border-gray-300 rounded'>
										<option value=''>Select Medical Institute</option>
										<option value='Ampara'>Ampara</option>
										<option value='Anuradhapura'>Anuradhapura</option>
										<option value='Badulla'>Badulla</option>
										<option value='Batticaloa'>Batticaloa</option>
										<option value='Colombo'>Colombo</option>
										<option value='Galle'>Galle</option>
										<option value='Gampaha'>Gampaha</option>
										<option value='Hambantota'>Hambantota</option>
										<option value='Jaffna'>Jaffna</option>
										<option value='Kalutara'>Kalutara</option>
										<option value='Kandy'>Kandy</option>
										<option value='Kegalle'>Kegalle</option>
										<option value='Kilinochchi'>Kilinochchi</option>
										<option value='Kurunegala'>Kurunegala</option>
										<option value='Mannar'>Mannar</option>
										<option value='Matale'>Matale</option>
										<option value='Matara'>Matara</option>
										<option value='Moneragala'>Moneragala</option>
										<option value='Mullaitivu'>Mullaitivu</option>
										<option value='Nuwara Eliya'>Nuwara Eliya</option>
										<option value='Polonnaruwa'>Polonnaruwa</option>
										<option value='Puttalam'>Puttalam</option>
										<option value='Ratnapura'>Ratnapura</option>
										<option value='Trincomalee'>Trincomalee</option>
										<option value='Vavuniya'>Vavuniya</option>
									</select>
									{errors.institute && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.institute.message}
										</p>
									)}
								</div>
							</div>

							{/* Buttons */}
							<div className='flex justify-end items-center gap-4'>
								<button
									type='button'
									onClick={() => reset()}
									className='bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600'>
									Reset
								</button>
								<button
									type='submit'
									disabled={isLoading}
									className={`${
										isLoading
											? "bg-gray-400"
											: "bg-green-600 hover:bg-green-700"
									} text-white py-2 px-4 rounded`}>
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

export default AddMedical;
