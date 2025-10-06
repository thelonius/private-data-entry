import { toast } from "@/hooks/use-toast";

export const showSuccess = (message: string) => {
  toast({
    title: "Success",
    description: message,
  });
};

export const showError = (message: string) => {
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
};

export const showLoading = (message: string) => {
  const { id } = toast({
    title: "Loading",
    description: message,
  });
  return id;
};

export const dismissToast = (toastId: string) => {
  // In a real implementation, we would dismiss the toast by ID
  // For now, we'll just show a dismiss message
  console.log(`Dismissing toast with ID: ${toastId}`);
};