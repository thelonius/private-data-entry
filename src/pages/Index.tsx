import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormStore } from "@/store/formStore";
import Stepper from "@/components/Stepper";
import PrivateDataForm from "@/components/forms/PrivateDataForm";
import AddressWorkForm from "@/components/forms/AddressWorkForm";
import LoanParametersForm from "@/components/forms/LoanParametersForm";
import SummaryModal from "@/components/SummaryModal";
import { toast } from "sonner";

const Index = () => {
  const { currentStep, setCurrentStep, formData, resetForm } = useFormStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const totalSteps = 3;

  // Sync URL -> store on mount / when param changes
  useEffect(() => {
    const p = params.step ? Number(params.step) : NaN;
    if (!isNaN(p) && p >= 1 && p <= totalSteps) {
      if (p !== currentStep) setCurrentStep(p);
    } else {
      // if param is invalid, navigate to the current step
      navigate(`/step/${currentStep}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.step]);

  const handleNext = () => {
    const next = Math.min(totalSteps, currentStep + 1);
    setCurrentStep(next);
    navigate(`/step/${next}`);
  };

  const handleBack = () => {
    const prev = Math.max(1, currentStep - 1);
    setCurrentStep(prev);
    navigate(`/step/${prev}`);
  };

  const handleSubmit = async () => {
    try {
      // Send data to dummy API
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${formData.firstName} ${formData.lastName}`,
          // Add other fields as needed
        })
      });
      
      if (response.ok) {
        setIsModalOpen(true);
        toast.success("Application submitted successfully!");
      } else {
        toast.error("Failed to submit application");
      }
    } catch (error) {
      toast.error("An error occurred while submitting your application");
      console.error("Submission error:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
    setCurrentStep(1);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Loan Application</h1>
            <p className="text-gray-600">Complete all steps to apply for a loan</p>
          </div>
          
          <Stepper currentStep={currentStep} totalSteps={totalSteps} />
          
          <div className="mt-8">
            {currentStep === 1 && (
              <PrivateDataForm onNext={handleNext} />
            )}
            
            {currentStep === 2 && (
              <AddressWorkForm onBack={handleBack} onNext={handleNext} />
            )}
            
            {currentStep === 3 && (
              <LoanParametersForm onBack={handleBack} onSubmit={handleSubmit} />
            )}
          </div>
        </div>
        
        <SummaryModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
    </>
  );
};

export default Index;