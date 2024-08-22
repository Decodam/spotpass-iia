export function getInitials(fullName) {
  const nameArray = fullName.trim().split(/\s+/);
  
  if (nameArray.length === 1) {
    return nameArray[0].charAt(0).toUpperCase();
  }

  const initials = nameArray
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
    
  if (initials.length > 2) {
    return initials.charAt(0) + initials.charAt(initials.length - 1);
  }

  return initials;
}


export function checkPasswordStrength(password) {
  let strength = 0;

  // Check the length of the password (min 8 characters)
  if (password.length >= 8) strength++;

  // Check for lowercase and uppercase letters
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;

  // Check for numbers
  if (/\d/.test(password)) strength++;

  // Check for special characters
  if (/[@$!%*?&#]/.test(password)) strength++;

  // Return the strength on a scale of 1 to 4
  return strength;
}