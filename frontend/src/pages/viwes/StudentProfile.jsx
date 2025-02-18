import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ProfilePic from "../../images/profiledefault.jpg";
import QuizProgressChart from "../../components/charts/quizChart";

import {
  PhoneCall,
  House,
  ImagePlus,
  ImageUp,
  IdCard,
  User,
  Calendar,
  CreditCard,
  Mail,
  MapPin,
  BookOpen,
  Users,
  Briefcase,
} from "lucide-react";

const StudentProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState();

  // State variables for profile fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [branch, setBranch] = useState("");
  const [course, setCourse] = useState("");
  const [training, setTraining] = useState("");
  const [userId, setUserId] = useState("");
  const [profileImg, setProfileImg] = useState(ProfilePic);

  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/api/user/get-user/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const student = await response.json();
        setFirstName(student.firstName || "N/A");
        setLastName(student.lastName || "N/A");
        setFullName(`${student.firstName} ${student.lastName}` || "N/A");
        setBirthday(student.birthday || "N/A");
        setNicNumber(student.nicNumber || "N/A");
        setContactNo(student.contactNo || "N/A");
        setWhatsappNo(student.whatsappNo || "N/A");
        setAddress(student.address || "N/A");
        setEmail(student.email || "N/A");
        setUserType(student.userType || "N/A");
        setBranch(student.branch || "N/A");
        setCourse(student.course || "N/A");
		    setTraining(student.training || "N/A"); // Ensure set correctly
        setUserId(student.userId || "N/A");
        setProfileImg(student.profilePic?.trim() ? `http://localhost:4000${student.profilePic}` : ProfilePic);
      } catch (err) {
        toast.error(err.message || "Error fetching student data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudentData();
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
        }
      );
      toast.success(response.data.message || "Profile Picture changed successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during the operation";
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
					Student Profile
				</h1>
			</div>
			<div className='my-4 bg-white p-6 rounded-lg shadow-md'>
				{/* Profile Picture and Basic Info Section */}
				<div className='flex md:flex-row flex-col gap-6 justify-around items-center'>
					<div className='flex gap-6 items-center md:flex-row flex-col'>
						<div className='border-4 border-blue-600 rounded-full'>
							<img
								src={profileImg || selectedImage || ProfilePic}
								alt='Profile Pic'
								className='size-48 object-cover rounded-full p-2'
							/>
						</div>
						<div className='flex flex-col gap-2 md:items-start items-center justify-center'>
							<h1 className='text-lg font-semibold bg-blue-200 text-blue-600 px-4 py-1 rounded-full'>
								Student
							</h1>
							<h1 className='text-2xl font-bold'>{fullName}</h1>
							<div className='flex gap-2 items-center text-gray-600 italic'>
								<IdCard size={20} /> {userId}
							</div>
							<div className='flex gap-2 items-center text-gray-600 italic'>
								<House size={20} /> {address}
							</div>
							<div className='flex gap-2 items-center text-gray-600 italic'>
								<PhoneCall size={20} /> {contactNo}
							</div>
						</div>
					</div>
					<div className='flex flex-col justify-center items-center gap-2'>
						<p className='bg-red-200 text-red-400 text-sm font-semibold px-2 py-1 rounded-md'>
							{imageName ? imageName : "No image selected"}
						</p>
						<label
							className='bg-yellow-400 px-4 py-2 rounded-md text-black font-semibold flex flex-row gap-2 cursor-pointer hover:bg-yellow-500 transition-colors'
							htmlFor='selectImg'>
							<ImagePlus /> Choose Profile Picture
						</label>
						<input
							type='file'
							id='selectImg'
							hidden
							onChange={handleImageChange}
						/>
						<button
							onClick={handleImgUpload}
							className='flex gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors'>
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

				{/* Additional Fields Section */}
				<div className='mt-8'>
					<h2 className='text-xl font-semibold text-gray-800 mb-4'>
						Personal Details
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{/* First Name */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<User size={18} />
								<span className='font-semibold'>First Name</span>
							</div>
							<p className='mt-2 text-gray-800'>{firstName}</p>
						</div>

						{/* Last Name */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<User size={18} />
								<span className='font-semibold'>Last Name</span>
							</div>
							<p className='mt-2 text-gray-800'>{lastName}</p>
						</div>

						{/* Full Name */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<User size={18} />
								<span className='font-semibold'>Full Name</span>
							</div>
							<p className='mt-2 text-gray-800'>{fullName}</p>
						</div>

						{/* Birthday */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<Calendar size={18} />
								<span className='font-semibold'>Birthday</span>
							</div>
							<p className='mt-2 text-gray-800'>{birthday}</p>
						</div>

						{/* NIC Number */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<CreditCard size={18} />
								<span className='font-semibold'>NIC Number</span>
							</div>
							<p className='mt-2 text-gray-800'>{nicNumber}</p>
						</div>

						{/* Contact No */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<PhoneCall size={18} />
								<span className='font-semibold'>Contact No</span>
							</div>
							<p className='mt-2 text-gray-800'>{contactNo}</p>
						</div>

						{/* WhatsApp No */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<PhoneCall size={18} />
								<span className='font-semibold'>WhatsApp No</span>
							</div>
							<p className='mt-2 text-gray-800'>{whatsappNo}</p>
						</div>

						{/* Address */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<MapPin size={18} />
								<span className='font-semibold'>Address</span>
							</div>
							<p className='mt-2 text-gray-800'>{address}</p>
						</div>

						{/* Email */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<Mail size={18} />
								<span className='font-semibold'>Email</span>
							</div>
							<p className='mt-2 text-gray-800'>{email}</p>
						</div>

						{/* User Type */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<Users size={18} />
								<span className='font-semibold'>User Type</span>
							</div>
							<p className='mt-2 text-gray-800'>{userType}</p>
						</div>

						{/* Branch */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<Briefcase size={18} />
								<span className='font-semibold'>Branch</span>
							</div>
							<p className='mt-2 text-gray-800'>{branch}</p>
						</div>

						{/* Course */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<BookOpen size={18} />
								<span className='font-semibold'>Course</span>
							</div>
							<p className='mt-2 text-gray-800'>{course}</p>
						</div>

						{/* Training */}
						<div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
							<div className='flex items-center gap-2 text-gray-500'>
								<BookOpen size={18} />
								<span className='font-semibold'>Training</span>
							</div>
							<p className='mt-2 text-gray-800'>{training}</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<QuizProgressChart userId={id} />
			</div>
		</>
	);
};

export default StudentProfile;