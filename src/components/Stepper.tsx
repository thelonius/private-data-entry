import React from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full py-6">
      <div className="flex justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
          <div 
            className="h-full bg-blue-500 transition-all duration-500 ease-in-out" 
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
        
        {/* Steps */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                isActive 
                  ? "bg-blue-500 border-blue-500 text-white scale-110" 
                  : isCompleted
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-white border-gray-300 text-gray-500"
              )}>
                <button
                  type="button"
                  onClick={() => navigate(`/step/${step}`)}
                  className="w-full h-full flex items-center justify-center rounded-full"
                >
                  {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ) : (
                    <span className="font-medium">{step}</span>
                  )}
                </button>
              </div>
              <span className={cn(
                "mt-2 text-sm font-medium",
                isActive ? "text-blue-600" : "text-gray-600"
              )}>
                Step {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;