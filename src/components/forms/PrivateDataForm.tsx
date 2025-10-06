import React, { useState, useEffect } from "react";
import { useFormStore } from "@/store/formStore";
import { formatPhoneNumber, validatePhoneNumber } from "@/utils/phoneFormatter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface PrivateDataFormProps {
  onNext: () => void;
}

const PrivateDataForm: React.FC<PrivateDataFormProps> = ({ onNext }) => {
  const { formData, setFormData } = useFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phoneValue, setPhoneValue] = useState("");

  useEffect(() => {
    // Format phone number when component mounts
    if (formData.phoneNumber) {
      setPhoneValue(formData.phoneNumber);
    }
  }, [formData.phoneNumber]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be in format 0XXX XXX XXX";
    }
    
    if (!formData.sex) {
      newErrors.sex = "Sex is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneValue(formatted);
    setFormData({ phoneNumber: formatted });
  };

  // Function to get display text for sex
  const getSexDisplayText = (value: string) => {
    switch (value) {
      case "male": return "Male";
      case "female": return "Female";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ firstName: e.target.value })}
            placeholder="Enter your first name"
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ lastName: e.target.value })}
            placeholder="Enter your last name"
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-xs text-gray-500 underline cursor-help">Format info</span>
            </TooltipTrigger>
            <TooltipContent>
              Format: 0XXX XXX XXX
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          id="phoneNumber"
          type="tel"
          value={phoneValue}
          onChange={handlePhoneChange}
          placeholder="0XXX XXX XXX"
          className={errors.phoneNumber ? "border-red-500" : ""}
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sex">Sex *</Label>
        <Select 
          value={formData.sex} 
          onValueChange={(value) => setFormData({ sex: value })}
        >
          <SelectTrigger className={errors.sex ? "border-red-500" : ""}>
            <SelectValue placeholder="Select your sex">
              {getSexDisplayText(formData.sex)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
        {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleNext}>Next Step</Button>
      </div>
    </div>
  );
};

export default PrivateDataForm;