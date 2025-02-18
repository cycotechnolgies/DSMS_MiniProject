import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ProfilePic from "../../images/profiledefault.jpg";
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
  Users,
  Briefcase,
} from "lucide-react";

const StaffProfile = () => {
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
  const [userId, setUserId] = useState("");
  const [profileImg, setProfileImg] = useState(ProfilePic);

  useEffect(() => {
    const fetchStaffData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/api/user/get-user/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch staff data");
        }
        const staff = await response.json();
        setFirstName(staff.firstName);
        setLastName(staff.lastName);
        setFullName(`${staff.firstName} ${staff.lastName}`);
        setBirthday(staff.birthday);
        setNicNumber(staff.nicNumber);
        setContactNo(staff.contactNo);
        setWhatsappNo(staff.whatsappNo);
        setAddress(staff.address);
        setEmail(staff.email);
        setUserType(staff.userType);
        setBranch(staff.branch);
        setUserId(staff.userId);
        setProfileImg(staff.profilePic?.trim() ? `http://localhost:4000${staff.profilePic}` : ProfilePic);
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
      <div className="mb-4 sm:mb-0">
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Staff Profile</h1>
      </div>
      <div className="my-4 bg-white p-6 rounded-lg shadow-md">
        {/* Profile Picture and Basic Info Section */}
        <div className="flex md:flex-row flex-col gap-6 justify-around items-center">
          <div className="flex gap-6 items-center md:flex-row flex-col">
            <div className="border-4 border-blue-600 rounded-full">
              <img
                src={profileImg || selectedImage || ProfilePic}
                alt="Profile Pic"
                className="size-48 object-cover rounded-full p-2"
              />
            </div>
            <div className="flex flex-col gap-2 md:items-start items-center justify-center">
              <h1 className="text-lg font-semibold bg-blue-200 text-blue-600 px-4 py-1 rounded-full">
                Staff
              </h1>
              <h1 className="text-2xl font-bold">{fullName}</h1>
              <div className="flex gap-2 items-center text-gray-600 italic">
                <IdCard size={20} /> {userId}
              </div>
              <div className="flex gap-2 items-center text-gray-600 italic">
                <House size={20} /> {address}
              </div>
              <div className="flex gap-2 items-center text-gray-600 italic">
                <PhoneCall size={20} /> {contactNo}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="bg-red-200 text-red-400 text-sm font-semibold px-2 py-1 rounded-md">
              {imageName ? imageName : "No image selected"}
            </p>
            <label
              className="bg-yellow-400 px-4 py-2 rounded-md text-black font-semibold flex flex-row gap-2 cursor-pointer hover:bg-yellow-500 transition-colors"
              htmlFor="selectImg">
              <ImagePlus /> Choose Profile Picture
            </label>
            <input
              type="file"
              id="selectImg"
              hidden
              onChange={handleImageChange}
            />
            <button
              onClick={handleImgUpload}
              className="flex gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
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
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "First Name", value: firstName, icon: User },
              { label: "Last Name", value: lastName, icon: User },
              { label: "Full Name", value: fullName, icon: User },
              { label: "Birthday", value: birthday, icon: Calendar },
              { label: "NIC Number", value: nicNumber, icon: CreditCard },
              { label: "Contact No", value: contactNo, icon: PhoneCall },
              { label: "WhatsApp No", value: whatsappNo, icon: PhoneCall },
              { label: "Address", value: address, icon: MapPin },
              { label: "Email", value: email, icon: Mail },
              { label: "User Type", value: userType, icon: Users },
              { label: "Branch", value: branch, icon: Briefcase },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Icon size={18} />
                  <span className="font-semibold">{label}</span>
                </div>
                <p className="mt-2 text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffProfile;
