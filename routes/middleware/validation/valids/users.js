const Validator = require("validator");
const isEmpty = require("../../../utils/isEmpty");

module.exports = [
  {
    path: "/api/users/current/username",
    routePath: "/current/username",
    method: "PUT",
    validate: (req, res, next) => {
      const errors = {};
      if (Object.keys(req.body).length !== 1 || isEmpty(req.body.username)) {
        errors.badRequest = "Incorrect data.";
      } else {
        if (isEmpty(req.body.username.name)) {
          errors.username = "Username is required.";
        } else if (!Validator.isAscii(req.body.username.name)) {
          errors.username = "Only latin characters.";
        } else if (
          !Validator.isLength(Validator.trim(req.body.username.name), {
            min: 4,
            max: 30
          })
        ) {
          errors.username = "Username must be between 4 and 30 characters.";
        }
        if (!isEmpty(req.body.username.description)) {
          if (!Validator.isAscii(req.body.username.description)) {
            errors.description = "Only latin characters.";
          } else if (
            !Validator.isLength(Validator.trim(req.body.username.description), {
              min: 4,
              max: 256
            })
          ) {
            errors.description =
              "Description must be between 4 and 256 characters.";
          }
        }
      }

      if (!isEmpty(errors)) {
        return res.status(400).json(errors);
      } else {
        next();
      }
    }
  },
  {
    path: "/api/users/current/email",
    routePath: "/current/email",
    method: "PUT",
    validate: (req, res, next) => {
      const errors = {};
      if (Object.keys(req.body).length !== 2) {
        errors.badRequest = "Incorrect data.";
      } else {
        if (isEmpty(req.body.email)) {
          errors.email = "Email is required.";
        } else if (!Validator.isAscii(req.body.email)) {
          errors.email = "Only latin characters.";
        } else if (!Validator.isEmail(Validator.trim(req.body.email))) {
          errors.email = "Incorrect email format.";
        } else if (
          !Validator.isLength(Validator.trim(req.body.email), {
            min: 6,
            max: 50
          })
        ) {
          errors.email = "Email must be between 6 and 50 characters.";
        }
        if (isEmpty(req.body.newEmail)) {
          errors.newEmail = "New email is required.";
        } else if (!Validator.isAscii(req.body.newEmail)) {
          errors.newEmail = "Only latin characters.";
        } else if (!Validator.isEmail(Validator.trim(req.body.newEmail))) {
          errors.newEmail = "Incorrect new email format.";
        } else if (
          !Validator.isLength(Validator.trim(req.body.newEmail), {
            min: 6,
            max: 50
          })
        ) {
          errors.newEmail = "New email must be between 6 and 50 characters.";
        }
      }

      if (!isEmpty(errors)) {
        return res.status(400).json(errors);
      } else {
        next();
      }
    }
  },
  {
    path: "/api/users/current/password",
    routePath: "/current/password",
    method: "PUT",
    validate: (req, res, next) => {
      const errors = {};
      if (Object.keys(req.body).length !== 2) {
        errors.badRequest = "Incorrect data.";
      } else {
        if (isEmpty(req.body.password)) {
          errors.password = "Password is required.";
        } else if (!Validator.isAscii(req.body.password)) {
          errors.password = "Only latin characters.";
        } else if (
          !Validator.isLength(Validator.trim(req.body.password), {
            min: 8,
            max: 50
          })
        ) {
          errors.email = "Password must be between 8 and 50 characters.";
        }
        if (isEmpty(req.body.newPassword)) {
          errors.newPassword = "New password is required.";
        } else if (!Validator.isAscii(req.body.newPassword)) {
          errors.newPassword = "Only latin characters.";
        } else if (
          !Validator.isLength(Validator.trim(req.body.newPassword), {
            min: 8,
            max: 50
          })
        ) {
          errors.newPassword = "New password must be between 8 and 50 characters.";
        }
      }

      if (!isEmpty(errors)) {
        return res.status(400).json(errors);
      } else {
        next();
      }
    }
  },
  {
    path: "/api/users/:userId/username",
    routePath: "/:userId/username",
    method: "PUT",
    validate: (req, res, next) => {
      const errors = {};
      if (Object.keys(req.body).length !== 1 || isEmpty(req.body.username)) {
        errors.badRequest = "Incorrect data.";
      } else {
        if (req.body.username.name !== null) {
          errors.username = "Incorrect username value.";
        }
        if (isEmpty(req.body.username.description)) {
          errors.description = "Description is required.";
        } else {
          if (!Validator.isAscii(req.body.username.description)) {
            errors.description = "Only latin characters.";
          } else if (
            !Validator.isLength(Validator.trim(req.body.username.description), {
              min: 4,
              max: 256
            })
          ) {
            errors.description =
              "Description must be between 4 and 256 characters.";
          }
        }
      }

      if (!isEmpty(errors)) {
        return res.status(400).json(errors);
      } else {
        next();
      }
    }
  },
  {
    path: "/api/users/:userId/avatar",
    routePath: "/:userId/avatar",
    method: "PUT",
    validate: (req, res, next) => {
      const errors = {};
      if (Object.keys(req.body).length !== 1 || isEmpty(req.body.avatar)) {
        errors.badRequest = "Incorrect data.";
      } else {
        if (req.body.avatar.image !== null) {
          errors.avatar = "Incorrect avatar value.";
        }
        if (isEmpty(req.body.avatar.description)) {
          errors.description = "Description is required.";
        } else {
          if (!Validator.isAscii(req.body.avatar.description)) {
            errors.description = "Only latin characters.";
          } else if (
            !Validator.isLength(Validator.trim(req.body.avatar.description), {
              min: 4,
              max: 256
            })
          ) {
            errors.description =
              "Description must be between 4 and 256 characters.";
          }
        }
      }

      if (!isEmpty(errors)) {
        return res.status(400).json(errors);
      } else {
        next();
      }
    }
  },
  {
    path: "/api/users/:userId/frozen",
    routePath: "/:userId/frozen",
    method: "PUT",
    validate: (req, res, next) => {
      const errors = {};
      if (Object.keys(req.body).length !== 1 || isEmpty(req.body.frozen)) {
        errors.badRequest = "Incorrect data.";
      } else {
        if (req.body.frozen.to !== null) {
          if (isEmpty(req.body.frozen.to)) {
            errors.to = "Freeze period is required.";
          } else {
            if (
              !Validator.isInt(req.body.frozen.to, {
                min: 1800000,
                max: 3153600000000
              })
            ) {
              errors.to = "Incorrect freeze period.";
            }
          }
        }
        if (isEmpty(req.body.frozen.description)) {
          errors.description = "Description is required.";
        } else {
          if (!Validator.isAscii(req.body.frozen.description)) {
            errors.description = "Only latin characters.";
          } else if (
            !Validator.isLength(Validator.trim(req.body.frozen.description), {
              min: 4,
              max: 256
            })
          ) {
            errors.description =
              "Description must be between 4 and 256 characters.";
          }
        }
      }

      if (!isEmpty(errors)) {
        return res.status(400).json(errors);
      } else {
        next();
      }
    }
  },
  {
    path: "/api/users/:userId/permission",
    routePath: "/:userId/permission",
    method: "PUT",
    validate: (req, res, next) => {
      const errors = {};
      if (Object.keys(req.body).length !== 1 || isEmpty(req.body.permission)) {
        errors.badRequest = "Incorrect data.";
      } else {
        if (isEmpty(req.body.permission.role)) {
          errors.role = "Role is required.";
        } else if (!Validator.isAscii(req.body.permission.role)) {
          errors.role = "Only latin characters.";
        } else if (
          !Validator.isLength(Validator.trim(req.body.permission.role), {
            min: 2,
            max: 50
          })
        ) {
          errors.role = "Role must be between 2 and 50 characters.";
        }
        if (isEmpty(req.body.permission.description)) {
          errors.description = "Description is required.";
        } else {
          if (!Validator.isAscii(req.body.permission.description)) {
            errors.description = "Only latin characters.";
          } else if (
            !Validator.isLength(
              Validator.trim(req.body.permission.description),
              {
                min: 4,
                max: 256
              }
            )
          ) {
            errors.description =
              "Description must be between 4 and 256 characters.";
          }
        }
      }

      if (!isEmpty(errors)) {
        return res.status(400).json(errors);
      } else {
        next();
      }
    }
  }
];
