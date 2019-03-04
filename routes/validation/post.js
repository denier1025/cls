const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.text = !isEmpty(data.text) ? data.text : "";
  data.tags = !isEmpty(data.tags) ? data.tags : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  } else if(!Validator.isLength(data.title, { min: 16, max: 128 })) {
    errors.title = "Title must be between 16 and 128 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  } else if(!Validator.isLength(data.text, { min: 1500, max: 3500 })) {
    errors.text = "Text must be between 1500 and 3500 characters";
  }

  if (Validator.isEmpty(data.tags)) {
    errors.tags = "Tags field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
