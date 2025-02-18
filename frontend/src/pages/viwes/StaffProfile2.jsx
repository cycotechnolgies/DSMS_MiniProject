import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ProfilePic from "../../images/profiledefault.jpg";
import { PhoneCall, House, ImagePlus, ImageUp, IdCard } from "lucide-react";

const StaffProfile = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageName, setImageName] = useState("");
	const [file, setFile] = useState();

	// State variables for profile fields
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [userId, setUserId] = useState("");
	const [profileImg, setProfileImg] = useState(ProfilePic);

	useEffect(() => {
		const fetchStaffData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`http://localhost:4000/api/user/get-user/${id}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch staff data");
				}
				const data = await response.json();
				// Assuming the response is an object, not an array
				const staff = data;
				setName(`${staff.firstName} ${staff.lastName}`);
				setPhone(staff.contactNo);
				setAddress(staff.address);
				setUserId(staff.userId);
				setProfileImg(
					staff.profilePic?.trim() ? `http://localhost:4000${staff.profilePic}` : ProfilePic);
			} catch (err) {
				toast.error(err.message || "Error fetching staff data");
			} finally {
				setIsLoading(false);
			}
		};
		fetchStaffData();
	}, [id]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageName(file.name); 
			setSelectedImage(URL.createObjectURL(file));
			setFile(file);
		}
	};

	const handleImgUpload = async () => {
		if (!file) {
			toast.error("No file selected");
			return;
		}
		const formData = new FormData();
		formData.append("profilePic", file);

		setIsLoading(true);
		try {
			const response = await axios.put(
				`http://localhost:4000/api/user/edit-profilePic/${id}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);
			toast.success(
				response.data.message || "Profile Picture changed successfully",
			);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
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
		<>
			<Toaster />
			<div className='mb-4 sm:mb-0'>
				<h1 className='text-2xl md:text-3xl text-gray-800 font-bold'>
					Staff Profile
				</h1>
			</div>
			<div className='my-4 bg-white p-4 rounded-md'>
				<div className='flex md:flex-row flex-col gap-4 justify-around items-center'>
					<div className='flex gap-4 items-center md:flex-row flex-col'>
						<div className='border-4 border-blue-600 rounded-full'>
							<img
								src={profileImg || selectedImage || ProfilePic}
								alt='profile Pic'
								className='size-48 object-cover rounded-full p-2'
							/>
						</div>
						<div className='flex flex-col gap-2 md:items-start items-center justify-center '>
							<h1 className='text-lg font-semibold bg-blue-200 text-blue-600 px-4 py-1 rounded-full'>
								Staff
							</h1>
							<h1 className='text-2xl font-bold'>{name}</h1>
							<div className='flex gap-2 items-center text-gray-600 italic'>
								<IdCard size={20} /> {userId}
							</div>
							<div className='flex gap-2 items-center text-gray-600 italic'>
								<House size={20} /> {address}
							</div>
							<div className='flex gap-2 items-center text-gray-600 italic'>
								<PhoneCall size={20} /> {phone}
							</div>
						</div>
					</div>
					<div className='flex flex-col justify-center items-center gap-2'>
						<p className='bg-red-200 text-red-400 text-sm font-semibold px-2 py-1 rounded-md'>
							{imageName ? imageName : "No image selected"}
						</p>
						<label
							className='bg-yellow-400 px-4 py-2 rounded-md text-black font-semibold flex flex-row gap-2'
							htmlFor='selectImg'>
							<ImagePlus />
							Choose Profile Picture
						</label>
						<input
							type='file'
							id='selectImg'
							hidden
							onChange={handleImageChange}
						/>
						<button
							onClick={handleImgUpload}
							className='flex gap-2 bg-black text-white px-4 py-2 rounded-md'>
							{isLoading ? (
								"Uploading..."
							) : (
								<>
									<ImageUp /> Upload Profile Picture
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default StaffProfile;
