import validator from "validator";

const validateSignData = (data, isSignIn) => {
  if (isSignIn) {
    if (validator.isEmpty(data.firstName || "")) {
      throw new Error("First name is required");
    }

    if (validator.isEmpty(data.lastName || "")) {
      throw new Error("Last name is required");
    }
    if (validator.isEmpty(data.confirmPassword || "")) {
      throw new Error("Confirm Password is required");
    } else if (!validator.equals(data.password, data.confirmPassword)) {
      throw new Error("Passwords do not match");
    }
  }

  if (validator.isEmpty(data.email || "")) {
    throw new Error("Email is required");
  } else if (!validator.isEmail(data.email)) {
    throw new Error("Invalid email format");
  }

  if (validator.isEmpty(data.password || "")) {
    throw new Error("Password is required");
  } else if (!validator.isLength(data.password, { min: 6 })) {
    throw new Error("Password must be at least 6 characters long");
  }
};

export default validateSignData;
