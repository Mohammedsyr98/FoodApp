export const emailValidation = {
  required: "Email Address is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "invalid email address",
  },
};

export const passwordValidation = {
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    message:
      "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
  },
};
