const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("mongoose").model("User");

const validateRegisterInput = require("../validation/register");
const isEmpty = require("../validation/isEmpty");

// @role   Do not need
// @route  POST api/register
// @desc   Register user
// @access Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    errors.badRequest = "Validation failed.";
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username })
    .then(user => {
      if (!isEmpty(user)) {
        errors.username = "Username already exists.";
        User.findOne({ email: req.body.email }).then(user => {
          if (!isEmpty(user)) {
            errors.email = "Email already exists.";
          }
        });
        errors.conflict = "Validation failed.";
        res.status(409).json(errors);
      } else {
        User.findOne({ email: req.body.email }).then(user => {
          if (!isEmpty(user)) {
            errors.email = "Email already exists.";
            errors.conflict = "Validation failed.";
            res.status(409).json(errors);
          } else {
            const newUser = new User({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password
            });
            bcryptjs.genSalt(10).then(salt => {
              bcryptjs.hash(newUser.password, salt).then(hash => {
                newUser.password = hash;
                newUser.save().then(() => {
                  User.findOne({ username: req.body.username }).then(user =>
                    res.status(201).json(user)
                  );
                });
              });
            });
          }
        });
      }
    })
    .catch(err => {
      errors.internalServerError = "Internal server error.";
      res.status(500).json(errors);
    });
});

// @role   Do not need
// @route  POST api/register/ucheck
// @desc   Check username field
// @access Public
router.post("/ucheck", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    errors.badRequest = "Validation failed.";
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username })
    .then(user => {
      if (!isEmpty(user)) {
        errors.username = "Username already exists.";
        errors.conflict = "Validation failed.";
        res.status(409).json(errors);
      } else {
        res.status(204).json();
      }
    })
    .catch(err => {
      errors.internalServerError = "Internal server error.";
      res.status(500).json(errors);
    });
});

// @role   Do not need
// @route  POST api/register/echeck
// @desc   Check email field
// @access Public
router.post("/echeck", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    errors.badRequest = "Validation failed.";
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!isEmpty(user)) {
        errors.email = "Email already exists.";
        errors.conflict = "Validation failed.";
        res.status(409).json(errors);
      } else {
        res.status(204).json();
      }
    })
    .catch(err => {
      errors.internalServerError = "Internal server error.";
      res.status(500).json(errors);
    });
});

module.exports = router;
