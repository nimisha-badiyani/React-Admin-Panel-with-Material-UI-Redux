// Validate Email
export const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };
  
  // Validate Password
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  // Validate Name
  export const validateName = (name) => {
    return name.trim().length > 0;
  };
  
  // Validate Number (for reference number and project number)
export const validateNumber = (value) => {
  return /^[0-9]+$/.test(value);
};

// Validate Required Fields
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};
  