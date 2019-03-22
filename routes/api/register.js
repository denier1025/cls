const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("mongoose").model("User");

const validateRegisterInput = require("../validation/register");
const validateUCheckInput = require("../validation/ucheck");
const isEmpty = require("../utils/isEmpty");

//TODO: TEMP!!!
// @role   Do not need
// @route  POST api/register
// @desc   Register user
// @access Public
router.post("/", (req, res) => {
  success = {};
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    errors.badRequest = "Validation failed.";
    return res.status(400).json(errors);
  }

  User.findOne({ "username.name": req.body.username.name })
    .then(user => {
      if (!isEmpty(user)) {
        errors.username = `${user.username.name} already exists.`;
        User.findOne({ email: req.body.email }).then(user => {
          if (!isEmpty(user)) {
            errors.email = `${user.email} already exists.`;
          }
          errors.conflict = "Validation failed.";
          res.status(409).json(errors);
        });
      } else {
        User.findOne({ email: req.body.email }).then(user => {
          if (!isEmpty(user)) {
            errors.email = `${user.email} already exists.`;
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
                newUser.save()
                 .then(() => {
                  success.ok = "Registred."
                  res.json(success);
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

// // @role   Do not need
// // @route  POST api/register
// // @desc   Register user
// // @access Public
// router.post("/", (req, res) => {
//   const { errors, isValid } = validateRegisterInput(req.body);

//   if (!isValid) {
//     errors.badRequest = "Validation failed.";
//     return res.status(400).json(errors);
//   }

//   // TODO: Check in Redis for existing username and email

//   User.findOne({ username: req.body.username })
//     .then(user => {
//       if (!isEmpty(user)) {
//         errors.username = "Username already exists.";
//         User.findOne({ email: req.body.email }).then(user => {
//           if (!isEmpty(user)) {
//             errors.email = "Email already exists.";
//           }
//         });
//         errors.conflict = "Validation failed.";
//         res.status(409).json(errors);
//       } else {
//         User.findOne({ email: req.body.email }).then(user => {
//           if (!isEmpty(user)) {
//             errors.email = "Email already exists.";
//             errors.conflict = "Validation failed.";
//             res.status(409).json(errors);
//           } else {
//             // TODO: object to save to Redis!!!
//             // const newUser = new User({
//             //   username: req.body.username,
//             //   email: req.body.email,
//             //   password: req.body.password
//             // });
//             bcryptjs.genSalt(10).then(salt => {
//               bcryptjs.hash(newUser.password, salt).then(hash => {
//                 // TODO: field to save to Redis!!!
//                 // newUser.password = hash;
//                 // TODO: save an object to Redis, like: newUser.save()
//                 // TODO: .then(() => {
//                   // TODO: Base58(bcryptjs(username, email, password)) -> send a confirmation url: https://clsociety.net/api/register/confirm/Base58(bcryptjs(username, email, password))
//                   res.status(204).json()
//                 // });
//               });
//             });
//           }
//         });
//       }
//     })
//     .catch(err => {
//       errors.internalServerError = "Internal server error.";
//       res.status(500).json(errors);
//     });
// });

// // @role   Do not need
// // @route  GET api/register/confirm/:encryptedData
// // @desc   Email confirmation
// // @access Public
// router.get("/confirm/:encryptedData", (req, res) => {
//   // TODO: Base58(req.params.encryptedData) -> go to redis and check username + email + password

//   if() {
//     new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//       }).save().then(() => {
//         res.status(204).json();
//       })
//       .catch(err => {
//         errors.internalServerError = "Internal server error.";
//         res.status(500).json(errors);
//       });
//   } else {
//     errors.url = "Invalid URL.";
//     errors.badRequest = "Garbage data.";
//     res.status(400).json(errors);
//   }
// });

// @role   Do not need
// @route  POST api/register/ucheck
// @desc   Check username field
// @access Public
router.post("/ucheck", (req, res) => {
  const success = {};
  const { errors, isValid } = validateUCheckInput(req.body);

  if (!isValid) {
    errors.badRequest = "Validation failed.";
    return res.status(400).json(errors);
  }

  User.findOne({ "username.name": req.body.username.name })
    .then(user => {
      if (!isEmpty(user)) {
        errors.username = `${user.username.name} already exists.`;
        errors.conflict = "Validation failed.";
        res.status(409).json(errors);
      } else {
        success.username = "This username is free.";
        res.json(success);
      }
    })
    .catch(err => {
      errors.internalServerError = "Internal server error.";
      res.status(500).json(errors);
    });
});

module.exports = router;
