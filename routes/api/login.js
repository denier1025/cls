const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const FrozenHistory = mongoose.model("FrozenHistory");
const keys = require("../../config/keys");

const validateLoginInput = require("../validation/login");
const isEmpty = require("../utils/isEmpty");

// @role   Do not need
// @route  POST api/login
// @desc   Login User / Returning JWT Token
// @access Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    errors.badRequest = "Validation failed.";
    return res.status(400).json(errors);
  }

  // TODO: Check login data in Redis

  User.findOne({ email: req.body.email })
    .then(user => {
      if (isEmpty(user)) {
        errors.email = "Incorrect email.";
        errors.notFound = "User not found with that email.";
        res.status(404).json(errors);
      } else {
        bcryptjs.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id
            };

            if (user.frozen && user.frozen.to) {
              if (!(user.frozen.to < Date.now())) {
                errors.frozen = {
                  from: user.frozen.from,
                  to: user.frozen.to,
                  description: user.frozen.description
                };
                errors.forbidden = `Your account in freeze until ${
                  user.frozen.to
                }. Reason: ${user.frozen.description}.`;
                res.status(403).json(errors);
              } else {
                new FrozenHistory({
                  by: user.id,
                  frozen: {
                    userId: user.id.toString(),
                    from: user.frozen.from,
                    to: user.frozen.to,
                    by: user.frozen.by,
                    description: user.frozen.description
                  }
                })
                  .save()
                  .then(() => {
                    User.update(
                      { _id: user.id },
                      {
                        $set: {
                          frozen: {
                            to: null
                          }
                        }
                      },
                      { new: true }
                    )
                    .then(() => {
                      jwt.sign(
                        payload,
                        keys.jwtSecretOrKey,
                        { expiresIn: 3600 },
                        (err, token) => {
                          res.json({
                            jwtToken: "Bearer " + token
                          });
                        }
                      );
                    });
                  });
              }
            } else {
              jwt.sign(
                payload,
                keys.jwtSecretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    token: "Bearer " + token
                  });
                }
              );
            }
          } else {
            errors.password = "Incorrect password.";
            errors.badRequest = "Password doesn't match.";
            res.status(400).json(errors);
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
// // @route  POST api/login/recovery
// // @desc   Password recovery
// // @access Public
// router.post("/recovery", (req, res) => {
//   const { errors, isValid } = validateLoginInput(req.body);

//   if (!isValid) {
//     errors.badRequest = "Validation failed.";
//     return res.status(400).json(errors);
//   }

//   User.findOne({ email: req.body.email })
//     .then(user => {
//       if (isEmpty(user)) {
//         errors.email = "Incorrect email.";
//         errors.notFound = "Email not found.";
//         res.status(404).json(errors);
//       } else {
//         // TODO: save to redis(email, time, exp date), generate url for recovery password(api/login/recovery/:Base58(bcryptjs(email, time))), and send to an email
//       }
//     })
//     .catch(err => {
//       errors.internalServerError = "Internal server error.";
//       res.status(500).json(errors);
//     });
// });

// // @role   Do not need
// // @route  PUT api/login/recovery/:encryptedData
// // @desc   Password recovery
// // @access Public
// router.get("/recovery/:encryptedData", (req, res) => {
//   /*TODO: Base58(req.params.encryptedData) -> go to redis and check email + time and exp date*/
//   if() {
//     User.findOne({ email: req.params.encryptedData.email })
//     .then(user => {
//       if (isEmpty(user)) {
//         errors.email = "Incorrect email.";
//         errors.notFound = "Email not found.";
//         res.status(404).json(errors);
//       } else {
//         const updateUser = (userData, plainPassword) => {
//           User.findByIdAndUpdate(
//             user.id,
//             {
//               $set: {
//                 ...userData
//               }
//             },
//             { new: true }
//           ).then(user => {
//             //TODO: Delete entry in Redis, send an email for changing with !!!plainPassword!!!
//             res.json(user);
//           });
//         };
//               new PasswordHistory({
//                 by: user.id,
//                 password: {
//                   userId: user.id.toString(),
//                   password: user.password
//                 }
//               })
//                 .save()
//                 .then(() => {
//                   //TODO: generate password: const newPassword = plainPassword = gen();
//                   bcryptjs.genSalt(10).then(salt => {
//                     bcryptjs.hash(newPassword, salt).then(hash => {
//                       newPassword = hash;
//                     });
//                   });
//                   updateUser({password: newPassword}, plainPassword); 
//                 });
//       }
//     })
//     .catch(err => {
//       errors.internalServerError = "Internal server error.";
//       res.status(500).json(errors);
//     });
//   } else {
//     errors.url = "Invalid URL.";
//     errors.badRequest = "Garbage data.";
//     res.status(400).json(errors);
//   }
// });

module.exports = router;
