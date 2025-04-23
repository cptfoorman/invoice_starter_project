
//validation functions for easy reuse
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  export function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\+?(\d.*){10,}$/;
    return phoneRegex.test(phoneNumber);
  }
  
  export function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  }