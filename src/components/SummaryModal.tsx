import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/formStore";

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SummaryModal: React.FC<SummaryModalProps> = ({ isOpen, onClose }) => {
  const { formData } = useFormStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Congratulations!</DialogTitle>
          <DialogDescription>
            Your loan application has been approved.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-lg">
            Congratulations, <span className="font-bold">{formData.lastName} {formData.firstName}</span>!
          </p>
          <p className="mt-2">
            You've been granted <span className="font-bold">${formData.loanQuantity}</span> for <span className="font-bold">{formData.term} days</span>.
          </p>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Summary of your information:</h3>
            <ul className="space-y-1 text-sm">
              <li><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</li>
              <li><span className="font-medium">Phone:</span> {formData.phoneNumber}</li>
              <li><span className="font-medium">Sex:</span> {formData.sex}</li>
              <li><span className="font-medium">Work Place:</span> {formData.workPlace}</li>
              <li><span className="font-medium">Home Address:</span> {formData.homeAddress}</li>
              <li><span className="font-medium">Loan Amount:</span> ${formData.loanQuantity}</li>
              <li><span className="font-medium">Term:</span> {formData.term} days</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SummaryModal;