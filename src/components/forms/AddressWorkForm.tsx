import React, { useState, useEffect } from "react";
import { useFormStore } from "@/store/formStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddressWorkFormProps {
  onBack: () => void;
  onNext: () => void;
}

const AddressWorkForm: React.FC<AddressWorkFormProps> = ({ onBack, onNext }) => {
  const { formData, setFormData, categories } = useFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch categories if not already loaded
    if (categories.length === 0) {
      fetch('https://dummyjson.com/products/category-list')
        .then(res => res.json())
        .then(data => {
          useFormStore.getState().setCategories(data);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    }
  }, [categories.length]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.workPlace) {
      newErrors.workPlace = "Work place is required";
    }
    
    if (!formData.homeAddress.trim()) {
      newErrors.homeAddress = "Home address is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="workPlace">Work Place *</Label>
        <Select 
          value={formData.workPlace} 
          onValueChange={(value) => setFormData({ workPlace: value })}
        >
          <SelectTrigger className={errors.workPlace ? "border-red-500" : ""}>
            <SelectValue placeholder="Select your work place" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.workPlace && <p className="text-red-500 text-sm">{errors.workPlace}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="homeAddress">Home Address *</Label>
        <Input
          id="homeAddress"
          value={formData.homeAddress}
          onChange={(e) => setFormData({ homeAddress: e.target.value })}
          placeholder="Enter your home address"
          className={errors.homeAddress ? "border-red-500" : ""}
        />
        {errors.homeAddress && <p className="text-red-500 text-sm">{errors.homeAddress}</p>}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handleNext}>Next Step</Button>
      </div>
    </div>
  );
};

export default AddressWorkForm;