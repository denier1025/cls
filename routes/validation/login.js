const Validator = require("validator");
const isEmpty = require("../utils/isEmpty");

module.exports = function validateLoginInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isLength(data.email, { min: 6, max: 50 })) {
    errors.email = "Email must be between 6 and 50 characters";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!Validator.isLength(data.password, { min: 8, max: 50 })) {
    errors.password = "Password must be between 8 and 50 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};