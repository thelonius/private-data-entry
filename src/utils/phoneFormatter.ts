export const __formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  console.log(value)
  const phoneNumber = value.replace(/\D/g, '');
  
  // Format as 0XXX XXX XXX
  if (phoneNumber.length <= 3) {
    return phoneNumber;
  }
  
  if (phoneNumber.length <= 6) {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
  }
  
  // Ensure the number starts with '0'
  let normalized = phoneNumber;
  if (!normalized.startsWith('0')) {
    normalized = '0' + normalized;
  }
  return `${normalized.slice(0, 3)} ${normalized.slice(3, 6)} ${normalized.slice(6, 9)}`;
};

export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');

  // Only allow up to 10 digits
  const sanitized = digits.slice(0, 10);

  // Apply the mask: 0XXX XXX XXX
  let result = '';
  if (sanitized.length > 0) {
    result += sanitized[0];
  }
  if (sanitized.length > 1) {
    result += sanitized.slice(1, 4);
  }
  if (sanitized.length > 4) {
    result += ' ' + sanitized.slice(4, 7);
  }
  if (sanitized.length > 7) {
    result += ' ' + sanitized.slice(7, 10);
  }
  return result;
}

export const validatePhoneNumber = (value: string): boolean => {
  // Check if it matches the pattern 0XXX XXX XXX
  const phoneRegex = /^0\d{3} \d{3} \d{3}$/;
  return phoneRegex.test(value);
};