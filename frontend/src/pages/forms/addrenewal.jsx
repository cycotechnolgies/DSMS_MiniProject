import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";

function AddRenewal() {
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
		if (id) {
			axios
				.get(`http://localhost:4000/api/renewal/get-renewal/${id}`)
				.then((response) => {
					const data = response.data;
					console.log(data);

					const formattedExpDate = data.expDate
						? new Date(data.expDate).toISOString().split("T")[0]
						: "";

					reset({
						fullName: data.fullName,
						nic: data.nic,
						contactNo: data.contactNo,
						whatsappNo: data.whatsappNo,
						address: data.address,
						branch: data.branch,
						LicenceType: data.LicenceType,
						vehiClass: data.vehiClass,
						bracode: data.bracode,
						expDate: formattedExpDate,
						renewState: data.renewState || "",
						collector: data.collector || "",
					});
				})
				.catch((error) => {
					console.error(error);
					toast.error("An error occurred while fetching the renewal data.");
				});
		}
	}, [id, reset]);


  const onSubmit = async (data) => {
		setIsLoading(true);
		console.log("formData", data);
		try {
			if (id) {
				// Update existing record
				const response = await axios.put(
					`http://localhost:4000/api/renewal/edit/${id}`,
					data,
					{ headers: { "Content-Type": "application/json" } },
				);
				console.log(response);
				toast.success("Renewal Request updated successfully!");
			} else {
				// Create new record
				const response = await axios.post(
					"http://localhost:4000/api/renewal/add",
					data,
				);
				console.log(response);
				toast.success("Renewal Request added successfully!");
			}

			navigate("/renew");
		} catch (error) {
			console.error(error);
			toast.error("An error occurred while submitting the form.");
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
							{id ? "Update Licence Renewal" : "New Licence Renewal"}
						</h1>

						<form
							onSubmit={handleSubmit(onSubmit)}
							noValidate
							className='space-y-4'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								{/* full Name */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Full Name <span className='text-red-600 font-bold'>*</span>
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

								{/* NIC Number */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										NIC Number <span className='text-red-600 font-bold'>*</span>
									</label>
									<input
										type='text'
										{...register("nic", {
											required: "NIC number is required",
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

								{/* Contact Number */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Contact No <span className='text-red-600 font-bold'>*</span>
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
										WhatsApp No{" "}
										<span className='text-red-600 font-bold'>*</span>
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
										Address <span className='text-red-600 font-bold'>*</span>
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
								{/* Branch */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Branch <span className='text-red-600 font-bold'>*</span>
									</label>
									<select
										{...register("branch", {
											required: "Branch is required",
										})}
										className='w-full p-2 border border-gray-300 rounded'>
										<option value=''>Select a Branch</option>
										<option value='Colombo'>Colombo</option>
										<option value='Gampaha'>Gampaha</option>
										<option value='galle'>Galle</option>
									</select>
									{errors.branch && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.branch.message}
										</p>
									)}
								</div>

								{/* Renew Type */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Licence Type{" "}
										<span className='text-red-600 font-bold'>*</span>
									</label>
									<select
										{...register("LicenceType", {
											required: "Licence Type is required",
										})}
										className='w-full p-2 border border-gray-300 rounded'>
										<option value=''>Select Licence Type</option>
										<option value='L Permit'>L Permit</option>
										<option value='Temporary'>Temporary</option>
									</select>
									{errors.LicenceType && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.LicenceType.message}
										</p>
									)}
								</div>

								{/* Vehical Class */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Vehical Class{" "}
										<span className='text-red-600 font-bold'>*</span>
									</label>
									<select
										{...register("vehiClass", {
											required: "Vehical Class is required",
										})}
										className='w-full p-2 border border-gray-300 rounded'>
										<option value=''>Select Vehical Class</option>
										<option value='Light Vehicle'>Light Vehicle</option>
										<option value='Heavy Vehicle'>Heavy Vehicle</option>
									</select>
									{errors.vehiClass && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.vehiClass.message}
										</p>
									)}
								</div>

								{/* Barcode */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Barcode <span className='text-red-600 font-bold'>*</span>
									</label>
									<input
										type='text'
										{...register("bracode", {
											required: "Barcode is required",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
										placeholder='Bracode is Requierd'
										maxLength={15}
									/>
									{errors.bracode && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.bracode.message}
										</p>
									)}
								</div>

								{/* Expier Date */}
								<div>
									<label className='block text-gray-700 font-medium mb-1'>
										Expier Date{" "}
										<span className='text-red-600 font-bold'>*</span>
									</label>
									<input
										type='date'
										{...register("expDate", {
											required: "Expier Date is required",
										})}
										className='w-full p-2 border border-gray-300 rounded placeholder:italic'
									/>
									{errors.expDate && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.expDate.message}
										</p>
									)}
								</div>
								{id && (
									<>
										{/* Renew State */}
										<div>
											<label className='block text-gray-700 font-medium mb-1'>
												Renew State
												<span className='text-red-600 font-bold'>*</span>
											</label>
											<select
												{...register("renewState", {
													required: "Renew State is required",
												})}
												className='w-full p-2 border border-gray-300 rounded'>
												<option value=''>Select Statues</option>
												<option value='Pending'>Pending</option>
												<option value='Document Collected'>
													Document Collected
												</option>
												<option value='Send To DMV'>Send To DMV</option>
												<option value='Licence Renewed'>Licence Renewed</option>
												<option value='Delivered New Licence'>
													Delivered New Licence
												</option>
											</select>
											{errors.renewState && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.renewState.message}
												</p>
											)}
										</div>
										{/* Collected */}
										<div>
											<label className='block text-gray-700 font-medium mb-1'>
												Collected By{" "}
											</label>
											<input
												type='text'
												{...register("collector")}
												className='w-full p-2 border border-gray-300 rounded placeholder:italic'
												placeholder='Owner, Other'
											/>
											{errors.collector && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.collector.message}
												</p>
											)}
										</div>
									</>
								)}
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

export default AddRenewal;
