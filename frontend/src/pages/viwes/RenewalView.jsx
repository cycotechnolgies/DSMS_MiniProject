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
  Calendar,
  CreditCard,
  MapPin,
  Users,
  Briefcase,
} from "lucide-react";

const RenewalView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState(null);

  // State for profile data
  const [profileData, setProfileData] = useState({
    fullName: "N/A",
    nic: "N/A",
    contactNo: "N/A",
    whatsappNo: "N/A",
    address: "N/A",
    branch: "N/A",
    licenceType: "N/A",
    vehiClass: "N/A",
    barcode: "N/A",
    expDate: "N/A",
    renewState: "N/A",
    collector: "N/A",
  });

  useEffect(() => {
    let isMounted = true; // To avoid state updates on unmounted component

    const fetchRenewalData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/api/renewal/get-renewal/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch renewal data: ${response.statusText}`);
        }
        const renewal = await response.json();
        if (isMounted) {
          setProfileData({
            fullName: renewal.fullName || "N/A",
            nicNumber: renewal.nic || "N/A", // Fixed property name
            contactNo: renewal.contactNo || "N/A",
            whatsappNo: renewal.whatsappNo || "N/A",
            address: renewal.address || "N/A",
            branch: renewal.branch || "N/A",
            licenceType: renewal.licenceType || "N/A", // Fixed property name
            vehiClass: renewal.vehiClass || "N/A",
            barcode: renewal.barcode || "N/A", // Fixed property name
            expDate: renewal.expDate || "N/A",
            renewState: renewal.renewState || "N/A",
            collector: renewal.collector || "N/A",
          });
        }
      } catch (err) {
        console.error("Error fetching renewal data:", err);
        toast.error(err.message || "Error fetching renewal data");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchRenewalData();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB.");
        return;
      }
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
        `http://localhost:4000/api/renewal/edit-profilePic/${id}`,
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
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Renewal Details</h1>
      </div>
      <div className="my-4 bg-white p-6 rounded-lg shadow-md">

        {/* Additional Fields Section */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Full Name */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Users size={18} />
                <span className="font-semibold">Full Name</span>
              </div>
              <p className="mt-2 text-gray-800">{profileData.fullName}</p>
            </div>

            {/* NIC Number */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <CreditCard size={18} />
                <span className="font-semibold">NIC Number</span>
              </div>
              <p className="mt-2 text-gray-800">{profileData.nicNumber}</p>
            </div>

            {/* Contact No */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <PhoneCall size={18} />
                <span className="font-semibold">Contact No</span>
              </div>
              <p className="mt-2 text-gray-800">{profileData.contactNo}</p>
            </div>

            {/* WhatsApp No */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <PhoneCall size={18} />
                <span className="font-semibold">WhatsApp No</span>
              </div>
              <p className="mt-2 text-gray-800">{profileData.whatsappNo}</p>
            </div>

            {/* Address */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={18} />
                <span className="font-semibold">Address</span>
              </div>
              <p className="mt-2 text-gray-800">{profileData.address}</p>
            </div>

            {/* Branch */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Briefcase size={18} />
                <span className="font-semibold">Branch</span>
              </div>
              <p className="mt-2 text-gray-800">{profileData.branch}</p>
            </div>

            {/* Licence Type */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Users size={18} />
                <span className="font-semibold">Licence Type</span>
              </div>
              <p className="mt-2 text-gray-800">{profileData.licenceType}</p>
            </div>

            {/* Vehicle Class */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Users size={18} />
                <span className="font-semibold">Vehicle Class</span>
              </div>
              <p className="mt-2 text-gray-800">{profileData.vehiClass}</p>
            </div>

            {/* Barcode */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <IdCard size={18} />
                <span className="font-semibold">Barcode</span>
              </div>
              <p className="mt-2 text-gray-800">{profileData.barcode}</p>
            </div>

            {/* Expiry Date */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={18} />
                <span className="font-semibold">Expiry Date</span>
              </div>
              <p className="mt-2 text-gray-800">{profileData.expDate}</p>
            </div>

            {/* Renew State */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Users size={18} />
                <span className="font-semibold">Renew State</span>
              </div>
              <p className="mt-2 text-gray-800">{profileData.renewState}</p>
            </div>

            {/* Collected By */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Users size={18} />
                <span className="font-semibold">Collected By</span>
              </div>
              <p className="mt-2 text-gray-800">{profileData.collector}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenewalView;