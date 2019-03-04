const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateUserInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.text = !isEmpty(data.text) ? data.text : "";
  data.tags = !isEmpty(data.tags) ? data.tags : "";

    // text

  return {
    errors,
    isValid: isEmpty(errors)
  };
};