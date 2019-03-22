const Validator = require("validator");
const isEmpty = require("../utils/isEmpty");

module.exports = function validateUCheckInput(data) {
  const errors = {};
  
  data.username.name = !isEmpty(data.username.name) ? data.username.name : "";

  if (Validator.isEmpty(data.username.name)) {
    errors.username = "Username field is required";
  } else if (!Validator.isLength(data.username.name, { min: 5, max: 30 })) {
    errors.username = "Username must be between 5 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};