export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  let phoneNumber = value.replace(/\D/g, '');
  
  // Ensure it starts with 0
  if (phoneNumber.length > 0 && phoneNumber[0] !== '0') {
    phoneNumber = '0' + phoneNumber;
  }
  
  // Limit to 10 digits
  if (phoneNumber.length > 10) {
    phoneNumber = phoneNumber.substring(0, 10);
  }
  
  // Format as 0XXX XXX XXX
  if (phoneNumber.length <= 4) {
    return phoneNumber;
  }
  
  if (phoneNumber.length <= 7) {
    return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4)}`;
  }
  
  return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 10)}`;
};

export const validatePhoneNumber = (value: string): boolean => {
  // Check if it matches the pattern 0XXX XXX XXX (exactly 10 digits)
  const phoneRegex = /^0\d{3} \d{3} \d{3}$/;
  return phoneRegex.test(value);
};