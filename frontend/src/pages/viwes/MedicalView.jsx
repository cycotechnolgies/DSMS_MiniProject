import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  PhoneCall,
  House,
  IdCard,
  User,
  Calendar,
  CreditCard,
  MapPin,
  Users,
  Briefcase,
  Clock,
  Clipboard,
  Car,
  Stethoscope,
} from "lucide-react";

const MedicalView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  // State variables for medical profile fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [gender, setGender] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [address, setAddress] = useState("");
  const [vehicleClass, setVehicleClass] = useState("");
  const [medicalInstitute, setMedicalInstitute] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [status, setStatus] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    const fetchMedicalData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/api/medical/get-medical/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch medical data");
        }
        const medicalData = await response.json();
        setFirstName(medicalData.firstName || "N/A");
        setLastName(medicalData.lastName || "N/A");
        setFullName(`${medicalData.firstName} ${medicalData.lastName}` || "N/A");
        setBirthday(medicalData.birthday || "N/A");
        setNicNumber(medicalData.nicNumber || "N/A");
        setGender(medicalData.gender || "N/A");
        setContactNo(medicalData.contactNo || "N/A");
        setWhatsappNo(medicalData.whatsappNo || "N/A");
        setAddress(medicalData.address || "N/A");
        setVehicleClass(medicalData.vehicleClass || "N/A");
        setMedicalInstitute(medicalData.medicalInstitute || "N/A");
        setRequestDate(medicalData.requestDate || "N/A");
        setStatus(medicalData.status || "N/A");
        setAppointmentDate(medicalData.appointmentDate || "N/A");
        setAppointmentTime(medicalData.appointmentTime || "N/A");
      } catch (err) {
        toast.error(err.message || "Error fetching medical data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMedicalData();
  }, [id]);

  return (
    <>
      <Toaster />
      <div className="mb-4 sm:mb-0">
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Medical Profile</h1>
      </div>
      <div className="my-4 bg-white p-6 rounded-lg shadow-md">
        {/* Basic Info Section */}
        <div className="flex md:flex-row flex-col gap-6 justify-around items-center">
          <div className="flex gap-6 items-center md:flex-row flex-col">
            <div className="flex flex-col gap-2 md:items-start items-center justify-center">
              <h1 className="text-2xl font-bold">{fullName}</h1>
              <div className="flex gap-2 items-center text-gray-600 italic">
                <IdCard size={20} /> {nicNumber}
              </div>
              <div className="flex gap-2 items-center text-gray-600 italic">
                <House size={20} /> {address}
              </div>
              <div className="flex gap-2 items-center text-gray-600 italic">
                <PhoneCall size={20} /> {contactNo}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Fields Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Medical Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* First Name */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <User size={18} />
                <span className="font-semibold">First Name</span>
              </div>
              <p className="mt-2 text-gray-800">{firstName}</p>
            </div>

            {/* Last Name */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <User size={18} />
                <span className="font-semibold">Last Name</span>
              </div>
              <p className="mt-2 text-gray-800">{lastName}</p>
            </div>

            {/* Full Name */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <User size={18} />
                <span className="font-semibold">Full Name</span>
              </div>
              <p className="mt-2 text-gray-800">{fullName}</p>
            </div>

            {/* Birthday */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={18} />
                <span className="font-semibold">Birthday</span>
              </div>
              <p className="mt-2 text-gray-800">{birthday}</p>
            </div>

            {/* NIC Number */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <CreditCard size={18} />
                <span className="font-semibold">NIC Number</span>
              </div>
              <p className="mt-2 text-gray-800">{nicNumber}</p>
            </div>

            {/* Gender */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Users size={18} />
                <span className="font-semibold">Gender</span>
              </div>
              <p className="mt-2 text-gray-800">{gender}</p>
            </div>

            {/* Contact No */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <PhoneCall size={18} />
                <span className="font-semibold">Contact No</span>
              </div>
              <p className="mt-2 text-gray-800">{contactNo}</p>
            </div>

            {/* WhatsApp No */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <PhoneCall size={18} />
                <span className="font-semibold">WhatsApp No</span>
              </div>
              <p className="mt-2 text-gray-800">{whatsappNo}</p>
            </div>

            {/* Address */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={18} />
                <span className="font-semibold">Address</span>
              </div>
              <p className="mt-2 text-gray-800">{address}</p>
            </div>

            {/* Vehicle Class */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Car size={18} />
                <span className="font-semibold">Vehicle Class</span>
              </div>
              <p className="mt-2 text-gray-800">{vehicleClass}</p>
            </div>

            {/* Medical Institute */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Stethoscope size={18} />
                <span className="font-semibold">Medical Institute</span>
              </div>
              <p className="mt-2 text-gray-800">{medicalInstitute}</p>
            </div>

            {/* Request Date */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={18} />
                <span className="font-semibold">Request Date</span>
              </div>
              <p className="mt-2 text-gray-800">{requestDate}</p>
            </div>

            {/* Status */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Clipboard size={18} />
                <span className="font-semibold">Status</span>
              </div>
              <p className="mt-2 text-gray-800">{status}</p>
            </div>

            {/* Appointment Date */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={18} />
                <span className="font-semibold">Appointment Date</span>
              </div>
              <p className="mt-2 text-gray-800">{appointmentDate}</p>
            </div>

            {/* Appointment Time */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock size={18} />
                <span className="font-semibold">Appointment Time</span>
              </div>
              <p className="mt-2 text-gray-800">{appointmentTime}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicalView;