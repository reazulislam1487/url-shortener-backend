export const validateRegister = ({ email, password }) => {
  if (!email || !password) {
    return "Email and password are required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please provide a valid email address";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  return null;
};
