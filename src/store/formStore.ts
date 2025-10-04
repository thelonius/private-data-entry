import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormData {
  // Step 1: Private Data
  firstName: string;
  lastName: string;
  phoneNumber: string;
  sex: string;
  
  // Step 2: Address and Work
  workPlace: string;
  homeAddress: string;
  
  // Step 3: Loan Parameters
  loanQuantity: number;
  term: number;
}

interface FormStore {
  formData: FormData;
  currentStep: number;
  categories: string[];
  setFormData: (data: Partial<FormData>) => void;
  setCurrentStep: (step: number) => void;
  setCategories: (categories: string[]) => void;
  resetForm: () => void;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  sex: "",
  workPlace: "",
  homeAddress: "",
  loanQuantity: 200,
  term: 10,
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      formData: initialFormData,
      currentStep: 1,
      categories: [],
      setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      setCurrentStep: (step) => set({ currentStep: step }),
      setCategories: (categories) => set({ categories }),
      resetForm: () => set({ 
        formData: initialFormData, 
        currentStep: 1 
      }),
    }),
    {
      name: "form-storage",
    }
  )
);