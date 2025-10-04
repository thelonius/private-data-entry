import React, { useState } from "react";
import { useFormStore } from "@/store/formStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface LoanParametersFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

const LoanParametersForm: React.FC<LoanParametersFormProps> = ({ onBack, onSubmit }) => {
  const { formData, setFormData } = useFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.loanQuantity < 200 || formData.loanQuantity > 1000) {
      newErrors.loanQuantity = "Loan quantity must be between $200 and $1000";
    }
    
    if (formData.term < 10 || formData.term > 30) {
      newErrors.term = "Term must be between 10 and 30 days";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label htmlFor="loanQuantity">Loan Quantity *</Label>
          <span className="font-medium">${formData.loanQuantity}</span>
        </div>
        <Slider
          id="loanQuantity"
          min={200}
          max={1000}
          step={100}
          value={[formData.loanQuantity]}
          onValueChange={(value) => setFormData({ loanQuantity: value[0] })}
          className={errors.loanQuantity ? "border-red-500" : ""}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>$200</span>
          <span>$1000</span>
        </div>
        {errors.loanQuantity && <p className="text-red-500 text-sm">{errors.loanQuantity}</p>}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label htmlFor="term">Term (Days) *</Label>
          <span className="font-medium">{formData.term} days</span>
        </div>
        <Slider
          id="term"
          min={10}
          max={30}
          step={1}
          value={[formData.term]}
          onValueChange={(value) => setFormData({ term: value[0] })}
          className={errors.term ? "border-red-500" : ""}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>10 days</span>
          <span>30 days</span>
        </div>
        {errors.term && <p className="text-red-500 text-sm">{errors.term}</p>}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handleSubmit}>Apply</Button>
      </div>
    </div>
  );
};

export default LoanParametersForm;