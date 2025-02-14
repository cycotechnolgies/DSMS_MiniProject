import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";

const AddPayment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role");
    const {
        register,
        handleSubmit,
        setError,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchPayDetails = async () => {
            if (id && role === 'branch') {
                setIsLoading(true);
                try {
                    const response = await axios.get(
                        `http://localhost:4000/api/pay/get-pay/${id}`,
                    );
                    const pays = response.data;

                    // Set other fields
                    for (const key in pays) {
                        setValue(key, pays[key]);
                    }
                } catch (error) {
                    console.error("Error fetching payment details:", error);
                    toast.error("Failed to load payment details");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchPayDetails();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }

            if (id && role === "branch") {
                // Edit staff logic
                const response = await axios.put(
                    `http://localhost:4000/api/pay/update-pay/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    },
                );
                toast.success(response.data.message || "Payment updated successfully");
                navigate("/Payments");
            } else {
                // Add payment logic
                if (!validator.matches(data.userId, /^USR-\d+$/)) {
                    setError("userId", {
                        type: "manual",
                        message: "User ID must start with 'USR-' followed by numbers",
                    });
                    setIsLoading(false);
                    return;
                }
                console.log(data);
                const response = await axios.post(
                    "http://localhost:4000/api/pay/add",
                    formData,
                );
                toast.success(response.data.message || "Payment added successfully");
                navigate("/payments");
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
                            {id ? "Update Payment" : "New Payment"}
                        </h1>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            className='space-y-4'>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                {/* Student id */}
                                <div>
                                    <label className='block text-gray-700 font-medium mb-1'>
                                        User Id <span className='text-red-600 font-bold'>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        {...register("userId", {
                                            required: "User ID is required",
                                        })}
                                        className='w-full p-2 border border-gray-300 rounded placeholder:italic'
                                        placeholder='USR-5673'
                                    />
                                    {errors.userId && (
                                        <p className='text-red-500 text-sm mt-1'>
                                            {errors.userId.message}
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
                                {/* amount paid */}
                                <div>
                                    <label className='block text-gray-700 font-medium mb-1'>
                                        Amount (Rs.){" "}
                                        <span className='text-red-600 font-bold'>*</span>
                                    </label>
                                    <input
                                        type='number'
                                        {...register("amount", {
                                            validate: (value) => {
                                                return (
                                                    validator.isNumeric(value) || "Input numbers only"
                                                );
                                            },
                                            required: "Amount is required",
                                        })}
                                        className='w-full p-2 border border-gray-300 rounded placeholder:italic'
                                        placeholder='1500'
                                    />
                                    {errors.amount && (
                                        <p className='text-red-500 text-sm mt-1'>
                                            {errors.amount.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-medium mb-1'>
                                        Reason <span className='text-red-600 font-bold'>*</span>
                                    </label>
                                    <select
                                        {...register("reason", {
                                            required: "Reason is required",
                                        })}
                                        className='w-full p-2 border border-gray-300 rounded'>
                                        <option value=''>Select a Reason</option>
                                        <option value='Registration fee'>Registration fee</option>
                                        <option value='Course fee'>Course fee</option>
                                        <option value='Course Installment'>
                                            Course Installment
                                        </option>
                                        <option value='Medical Payment'>Medical Payment</option>
                                        <option value='License Renewal fee'>
                                            License Renewal fee
                                        </option>
                                        <option value='Exam fee'>Exam fee</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                    {errors.reason && (
                                        <p className='text-red-500 text-sm mt-1'>
                                            {errors.reason.message}
                                        </p>
                                    )}
                                </div>
                                {(id || role === "branch") && (
                                    <>
                                        {/* Statuse */}
                                        <div>
                                            <label className='block text-gray-700 font-medium mb-1'>
                                                Status <span className='text-red-600 font-bold'>*</span>
                                            </label>
                                            <select
                                                {...register("status", {
                                                    required: "Status is required",
                                                })}
                                                className='w-full p-2 border border-gray-300 rounded'>
                                                <option value=''>Select Status</option>
                                                <option
                                                    value='Paid'
                                                    selected={role === "branch" && !id}>
                                                    Paid
                                                </option>
                                                <option value='Pending '>Pending</option>
                                                <option value='Canceled'>Canceled</option>
                                            </select>
                                            {errors.status && (
                                                <p className='text-red-500 text-sm mt-1'>
                                                    {errors.status.message}
                                                </p>
                                            )}
                                        </div>
                                        {/* Description paid */}
                                        <div>
                                            <label className='block text-gray-700 font-medium mb-1'>
                                                Description
                                            </label>
                                            <input
                                                type='text'
                                                {...register("description")}
                                                className='w-full p-2 border border-gray-300 rounded placeholder:italic'
                                                placeholder='Descripption'
                                            />
                                        </div>
                                    </>
                                )}
                                {role === "student" && (
                                    <>
                                        {/* payment slip */}
                                        <div>
                                            <label className='block text-gray-700 font-medium mb-1'>
                                                Payment Slip ("jpg/png")
                                                <span className='text-red-600 font-bold'>*</span>
                                            </label>
                                            <input
                                                type='file'
                                                {...register("slip", {
                                                    required: "Slip is required",
                                                })}
                                                className='w-full p-2 border border-gray-300 rounded placeholder:italic'
                                                placeholder='bank slip'
                                            />
                                            {errors.slip && (
                                                <p className='text-red-500 text-sm mt-1'>
                                                    {errors.slip.message}
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
};

export default AddPayment;
