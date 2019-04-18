const Validator = require("validator");
const isEmpty = require("../utils/isEmpty");

module.exports = function validateUserInput(data) {
    const errors = {};

    // if(data.username) {
    //     data.username = !isEmpty(data.username) ? data.username : "";
    // }
    // data.email = !isEmpty(data.email) ? data.email : "";
    // data.newEmail = !isEmpty(data.newEmail) ? data.newEmail : "";
    // data.password = !isEmpty(data.password) ? data.password : "";
    // data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
    // data.avatar = !isEmpty(data.avatar) ? data.avatar : "";
    // if(data.secret) {
    //     data.secret = !isEmpty(data.secret) ? data.secret : "";
    // }
    // data.permission = !isEmpty(data.permission) ? data.permission : "";
    // if(data.frozen) {
    //     data.frozen = !isEmpty(data.frozen) ? data.frozen : "";
    // }
  
    // if (!Validator.isEmpty(data.username)) {
    //     if (!Validator.isLength(data.username, { min: 4, max: 30 })) {
    //         errors.username = "Username must be between 4 and 30 characters";
    //     }
    // }
  
    // if (!Validator.isEmpty(data.email)) {
    //     if (!Validator.isLength(data.email, { min: 6, max: 50 })) {
    //         errors.email = "Email must be between 6 and 50 characters";
    //     } else if (!Validator.isEmail(data.email)) {
    //         errors.email = "Email is invalid";
    //     }
    // }

    // if (!Validator.isEmpty(data.newEmail)) {
    //     if (!Validator.isLength(data.newEmail, { min: 6, max: 50 })) {
    //         errors.newEmail = "New email must be between 6 and 50 characters";
    //     } else if (!Validator.isEmail(data.newEmail)) {
    //         errors.newEmail = "New email is invalid";
    //     }
    // }
  
    // if (!Validator.isEmpty(data.password)) {
    //     if (!Validator.isLength(data.password, { min: 8, max: 50 })) {
    //         errors.password = "Password must be between 8 and 50 characters";
    //     }
    // }

    // if (!Validator.isEmpty(data.newPassword)) {
    //     if (!Validator.isLength(data.newPassword, { min: 8, max: 50 })) {
    //         errors.newPassword = "New password must be between 8 and 50 characters";
    //     }
    // }

    // // if (!Validator.isEmpty(data.avatar)) {
        
    // // }

    // // if (!Validator.isEmpty(data.permission)) {
        
    // // }

    // // if (!Validator.isEmpty(data.frozen)) {
        
    // // }
  
    return {
      errors,
      isValid: isEmpty(errors)
    };
};