import { useState } from "react";
import AddStudent from "./addStudent";
import AddCourse from "./addCourse";
import AddPayment from "./addPayment";
import Confirm from "./addClass";
import axios from "axios";

const Enroll = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  // Update form data while keeping previous values
  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = (data) => {
    updateFormData(data);
    console.log("Form Data:", { ...formData, ...data });
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleConfirm = async () => {
    try {
      await axios.post("http://localhost:5000/api/enroll", formData);
      alert("Enrollment successful!");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className='mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white'>
      <div className='flex justify-between mb-5'>
        <span className={`step ${step >= 1 ? "text-blue-500" : ""}`}>
          1. Personal
        </span>
        <span className={`step ${step >= 2 ? "text-blue-500" : ""}`}>
          2. Course
        </span>
        <span className={`step ${step >= 3 ? "text-blue-500" : ""}`}>
          3. Payment
        </span>
        <span className={`step ${step === 4 ? "text-blue-500" : ""}`}>
          4. Confirm
        </span>
      </div>

      {step === 1 && (
        <AddStudent onNext={handleNext} defaultValues={formData} />
      )}
      {step === 2 && (
        <AddCourse
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData}
        />
      )}
      {step === 3 && (
        <AddPayment
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData}
        />
      )}
      {step === 4 && (
        <Confirm
          data={formData}
          onConfirm={handleConfirm}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Enroll;
