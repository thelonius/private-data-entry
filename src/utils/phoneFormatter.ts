export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const phoneNumber = value.replace(/\D/g, '');
  
  // Format as 0XXX XXX XXX
  if (phoneNumber.length <= 3) {
    return phoneNumber;
  }
  
  if (phoneNumber.length <= 6) {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
  }
  
  return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 9)}`;
};

export const validatePhoneNumber = (value: string): boolean => {
  // Check if it matches the pattern 0XXX XXX XXX
  const phoneRegex = /^0\d{3} \d{3} \d{3}$/;
  return phoneRegex.test(value);
};