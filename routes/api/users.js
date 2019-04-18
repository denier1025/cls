const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const base58 = require("base-58");
const sha256 = require("sha256");
const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const FrozenHistory = mongoose.model("FrozenHistory");
const UsernameHistory = mongoose.model("UsernameHistory");
const AvatarHistory = mongoose.model("AvatarHistory");
const PermissionHistory = mongoose.model("PermissionHistory");
const EmailHistory = mongoose.model("EmailHistory");
const PasswordHistory = mongoose.model("PasswordHistory");
const SecretHistory = mongoose.model("SecretHistory");

const validateUserInput = require("../validation/user");
const isEmpty = require("../utils/isEmpty");
// const Roles = require("../utils/roles");

// // @role   all(user, mod, supermod, admin)
// // @route  GET api/users/current
// // @desc   Return current user
// // @access Private
// router.get(
//   "/current",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       username: req.user.username,
//       avatar: req.user.avatar,
//       permission: {
//         role: req.user.permission.role
//       }
//     });
//   }
// );

// @role   all(user, mod, supermod, admin)
// @route  PUT api/users/current
// @desc   Modify one of the current fields (username/email/password/avatar/secret)
// @access Private
router.put(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const success = {};

    const { errors, isValid } = validateUserInput(req.body);

    if (!isValid) {
      errors.badRequest = "Validation failed.";
      return res.status(400).json(errors);
    }

    User.findById(req.user.id)
      .then(user => {
        if (isEmpty(user)) {
          errors.notFound = "No user with that id.";
          res.status(404).json(errors);
        } else {
          const updateUser = userData => {
            User.findByIdAndUpdate(
              req.user.id,
              {
                $set: {
                  ...userData
                }
              },
              { new: true }
            )
              .then(user => {
                //TODO: send an email for changing
                success.ok = "Updated.";
                res.json(success);
              })
              .catch(err => {
                if (err.name === "MongoError") {
                  errors.conflict = "Not unique.";
                  res.status(409).json(errors);
                }
              });
          };
          if (req.body.username && Object.keys(req.body).length === 1) {
            if (req.body.username.name === user.username.name) {
              errors.badRequest = "The same username.";
              return res.status(400).json(errors);
            }
            new UsernameHistory({
              by: req.user.id,
              username: {
                userId: user.id.toString(),
                name: user.username.name,
                by: user.username.by,
                description: user.username.description
              }
            })
              .save()
              .then(() => {
                updateUser(req.body);
              });
          } else if (
            req.body.email &&
            req.body.newEmail &&
            Object.keys(req.body).length === 2
          ) {
            if (req.body.email !== user.email) {
              errors.badRequest = "Email doesn't match.";
              return res.status(400).json(errors);
            } else if (req.body.newEmail === user.email) {
              errors.badRequest = "The same email.";
              return res.status(400).json(errors);
            } else {
              new EmailHistory({
                by: req.user.id,
                email: {
                  userId: user.id.toString(),
                  email: user.email
                }
              })
                .save()
                .then(() => {
                  updateUser({ email: req.body.newEmail });
                });
            }
          } else if (
            req.body.password &&
            req.body.newPassword &&
            Object.keys(req.body).length === 2
          ) {
            if (req.body.password === req.body.newPassword) {
              errors.badRequest = "The same password.";
              return res.status(400).json(errors);
            }
            bcryptjs.compare(req.body.password, user.password).then(isMatch => {
              if (isMatch) {
                new PasswordHistory({
                  by: req.user.id,
                  password: {
                    userId: user.id.toString(),
                    password: user.password
                  }
                })
                  .save()
                  .then(() => {
                    bcryptjs.genSalt(10).then(salt => {
                      bcryptjs
                        .hash(req.body.newPassword, salt)
                        .then(hash => {
                          req.body.newPassword = hash;
                        })
                        .then(() => {
                          updateUser({ password: req.body.newPassword });
                        });
                    });
                  });
              } else {
                errors.badRequest = "Password doesn't match.";
                res.status(400).json(errors);
              }
            });
          } else if (req.body.avatar && Object.keys(req.body).length === 1) {
            if (
              req.body.avatar.image &&
              user.avatar &&
              user.avatar.image &&
              req.body.avatar.image.buffer === user.avatar.image.buffer
            ) {
              errors.badRequest = "The same avatar.";
              return res.status(400).json(errors);
            }
            if (user.avatar) {
              new AvatarHistory({
                by: req.user.id,
                avatar: {
                  userId: user.id.toString(),
                  image: user.avatar.image,
                  from: user.avatar.from,
                  by: user.avatar.by,
                  description: user.avatar.description
                }
              })
                .save()
                .then(() => {
                  updateUser(req.body);
                });
            } else if (!req.body.avatar.image && !user.avatar.image) {
              errors.badRequest = "Nothing to change. Avatar isn't setup.";
              res.status(400).json(errors);
            } else {
              updateUser(req.body);
            }
          } else if (req.body.newSecret) {
            if (user.secret) {
              if (req.body.secret && Object.keys(req.body).length === 2) {
                if (req.body.secret.answer === req.body.newSecret.answer) {
                  errors.badRequest = "The same secret.";
                  return res.status(400).json(errors);
                }
                bcryptjs
                  .compare(req.body.secret.answer, user.secret.answer)
                  .then(isMatch => {
                    console.log(isMatch);
                    if (isMatch) {
                      new SecretHistory({
                        by: req.user.id,
                        secret: {
                          userId: user.id.toString(),
                          question: user.secret.question,
                          answer: user.secret.answer
                        }
                      })
                        .save()
                        .then(() => {
                          bcryptjs.genSalt(10).then(salt => {
                            bcryptjs
                              .hash(req.body.newSecret.answer, salt)
                              .then(hash => {
                                req.body.newSecret.answer = hash;
                              })
                              .then(() => {
                                updateUser({ secret: req.body.newSecret });
                              });
                          });
                        });
                    } else {
                      errors.badRequest = "Secret doesn't match.";
                      res.status(400).json(errors);
                    }
                  });
              } else {
                errors.badRequest = "Current secret answer is required.";
                res.status(400).json(errors);
              }
            } else {
              if (Object.keys(req.body).length === 1) {
                bcryptjs.genSalt(10).then(salt => {
                  bcryptjs
                    .hash(req.body.newSecret.answer, salt)
                    .then(hash => {
                      req.body.newSecret.answer = hash;
                    })
                    .then(() => {
                      updateUser({ secret: req.body.newSecret });
                    });
                });
              } else {
                errors.badRequest = "Incorrect data.";
                res.status(400).json(errors);
              }
            }
          } else {
            errors.badRequest = "Incorrect data.";
            res.status(400).json(errors);
          }
        }
      })
      .catch(err => {
        if (err.name === "CastError") {
          errors.notFound = "No user with that id.";
          res.status(404).json(errors);
        } else {
          errors.internalServerError = `Internal server error: ${err.name} ${
            err.message
          }.`;
          res.status(500).json(errors);
        }
      });
  }
);

// // @role   mod, supermod, admin
// // @route  GET api/users/:id
// // @desc   Get user by id
// // @access Private
// router.get(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     errors = {};

//     if (
//       ![
//         Roles.props[Roles.MOD],
//         Roles.props[Roles.SUPERMOD],
//         Roles.props[Roles.ADMIN]
//       ].includes(req.user.permission.role)
//     ) {
//       errors.forbidden = "Not enough permissions.";
//       return res.status(403).json(errors);
//     }

//     User.findById(req.params.id)
//       .then(user => {
//         if (isEmpty(user)) {
//           errors.notFound = "No user with that id.";
//           res.status(404).json(errors);
//         } else if (
//           Roles.reverseProps[req.user.permission.role] &&
//           Roles.reverseProps[req.user.permission.role] <=
//             Roles.reverseProps[user.permission.role]
//         ) {
//           errors.forbidden = "Not enough permissions.";
//           res.status(403).json(errors);
//         } else {
//           const newUser = {
//             id: user.id,
//             username: user.username,
//             avatar: user.avatar,
//             frozen: user.frozen
//           };
//           if (req.user.permission.role === Roles.props[Roles.MOD]) {
//             res.json({
//               permission: {
//                 role: user.permission.role
//               },
//               ...newUser
//             });
//           } else if (req.user.permission.role === Roles.props[Roles.SUPERMOD]) {
//             res.json({
//               permission: user.permission,
//               ...newUser
//             });
//           } else if (req.user.permission.role === Roles.props[Roles.ADMIN]) {
//             res.json(user);
//           }
//         }
//       })
//       .catch(err => {
//         if (err.name === "CastError") {
//           errors.notFound = "No user with that id.";
//           res.status(404).json(errors);
//         } else {
//           errors.internalServerError = `Internal server error: ${err.name} ${
//             err.message
//           }.`;
//           res.status(500).json(errors);
//         }
//       });
//   }
// );

// // @role   mod, supermod, admin
// // @route  PUT api/users/:id
// // @desc   Modify one of the user's fields by id (username/avatar/frozen/permission)
// // @access Private
// router.put(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const success = {};

//     const { errors, isValid } = validateUserInput(req.body);

//     if (!isValid) {
//       errors.badRequest = "Validation failed.";
//       return res.status(400).json(errors);
//     }

//     if (
//       req.user.id === req.params.id ||
//       ![
//         Roles.props[Roles.MOD],
//         Roles.props[Roles.SUPERMOD],
//         Roles.props[Roles.ADMIN]
//       ].includes(req.user.permission.role)
//     ) {
//       errors.forbidden = "Not enough permissions.";
//       return res.status(403).json(errors);
//     }

//     User.findById(req.params.id)
//       .then(user => {
//         if (isEmpty(user)) {
//           errors.notFound = "No user with that id.";
//           res.status(404).json(errors);
//         } else if (
//           Roles.reverseProps[req.user.permission.role] &&
//           Roles.reverseProps[req.user.permission.role] <=
//             Roles.reverseProps[user.permission.role]
//         ) {
//           errors.forbidden = "Not enough permissions.";
//           res.status(403).json(errors);
//         } else {
//           const updateUser = userData => {
//             User.findByIdAndUpdate(
//               req.params.id,
//               {
//                 $set: {
//                   ...userData
//                 }
//               },
//               { new: true }
//             )
//               .then(user => {
//                 //TODO: send an email for changing
//                 success.ok = "Updated.";
//                 res.json(success);
//               })
//               .catch(err => {
//                 if (err.name === "MongoError") {
//                   errors.conflict = "Not unique.";
//                   res.status(409).json(errors);
//                 }
//               });
//           };
//           if (
//             req.body.username &&
//             !req.body.username.name &&
//             Object.keys(req.body).length === 1
//           ) {
//             req.body.username.name =
//               "Noname" +
//               base58.encode(
//                 new Buffer.from(
//                   sha256(
//                     user.id + toString(Math.floor(Math.random() * 1000 + 1))
//                   )
//                 )
//               );
//             new UsernameHistory({
//               by: req.user.id,
//               username: {
//                 userId: user.id.toString(),
//                 name: user.username.name,
//                 by: user.username.by,
//                 description: user.username.description
//               }
//             })
//               .save()
//               .then(() => {
//                 updateUser(req.body);
//               });
//           } else if (
//             req.body.avatar &&
//             !req.body.avatar.image &&
//             Object.keys(req.body).length === 1
//           ) {
//             if (user.avatar) {
//               new AvatarHistory({
//                 by: req.user.id,
//                 avatar: {
//                   userId: user.id.toString(),
//                   image: user.avatar.image,
//                   from: user.avatar.from,
//                   by: user.avatar.by,
//                   description: user.avatar.description
//                 }
//               })
//                 .save()
//                 .then(() => {
//                   updateUser(req.body);
//                 });
//             } else {
//               errors.badRequest = "Nothing to change. Avatar isn't setup.";
//               res.status(400).json(errors);
//             }
//           } else if (req.body.frozen && Object.keys(req.body).length === 1) {
//             if (
//               req.body.frozen.to &&
//               user.frozen.to &&
//               user.frozen.to > Date.now()
//             ) {
//               errors.forbidden = "This user already in freeze.";
//               res.status(403).json(errors);
//             } else if (
//               (user.frozen.to && user.frozen.to < Date.now()) ||
//               (!req.body.frozen.to &&
//                 user.frozen.to &&
//                 user.frozen.to > Date.now())
//             ) {
//               new FrozenHistory({
//                 by: req.user.id,
//                 frozen: {
//                   userId: user.id.toString(),
//                   from: user.frozen.from,
//                   to: user.frozen.to,
//                   by: user.frozen.by,
//                   description: user.frozen.description
//                 }
//               })
//                 .save()
//                 .then(() => {
//                   updateUser(req.body);
//                 });
//             } else if (!req.body.frozen.to && !user.frozen.to) {
//               errors.badRequest =
//                 "Nothing to change. This user is not in freeze.";
//               res.status(400).json(errors);
//             } else {
//               updateUser(req.body);
//             }
//           } else if (
//             req.body.permission &&
//             Object.keys(req.body).length === 1
//           ) {
//             if (req.user.permission.role === Roles.props[Roles.ADMIN]) {
//               if (req.body.permission.role === user.permission.role) {
//                 errors.badRequest = "The same role.";
//                 return res.status(400).json(errors);
//               }
//               new PermissionHistory({
//                 by: req.user.id,
//                 permission: {
//                   userId: user.id.toString(),
//                   role: user.permission.role,
//                   from: user.permission.from,
//                   by: user.permission.by,
//                   description: user.permission.description
//                 }
//               })
//                 .save()
//                 .then(() => {
//                   updateUser(req.body);
//                 });
//             } else {
//               errors.forbidden = "Not enough permissions.";
//               res.status(403).json(errors);
//             }
//           } else {
//             errors.badRequest = "Incorrect data.";
//             res.status(400).json(errors);
//           }
//         }
//       })
//       .catch(err => {
//         if (err.name === "CastError") {
//           errors.notFound = "No user with that id.";
//           res.status(404).json(errors);
//         } else {
//           errors.internalServerError = `Internal server error: ${err.name} ${
//             err.message
//           }.`;
//           res.status(500).json(errors);
//         }
//       });
//   }
// );

// // @role   admin
// // @route  GET api/users
// // @desc   Get all users
// // @access Private
// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     errors = {};

//     if (!(req.user.permission.role === Roles.props[Roles.ADMIN])) {
//       errors.forbidden = "Not enough permissions.";
//       return res.status(403).json(errors);
//     }

//     User.find()
//       .then(users => {
//         res.json(users);
//       })
//       .catch(err => {
//         errors.internalServerError = `Internal server error: ${err.name} ${
//           err.message
//         }.`;
//         res.status(500).json(errors);
//       });
//   }
// );

// TODO: new routes, how it should be!
const Perm = require("../middleware/permission");
const permission = new Perm("users.js");
const Valid = require("../middleware/validation");
const validation = new Valid("users.js");

// @role   admin
// @route  GET api/users
// @desc   Get all users
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  permission.check(),
  (req, res) => {
    errors = {};

    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        errors.internalServerError = `Internal server error: ${err.name} ${
          err.message
        }.`;
        res.status(500).json(errors);
      });
  }
);

// @role   all
// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  permission.check(),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      avatar: req.user.avatar,
      permission: {
        role: req.user.permission.role
      }
    });
  }
);

// @role   all
// @route  DELETE api/users/current
// @desc   Logout current user
// @access Private
//TODO: block JWT tokens from redis until exp date

// @role   all
// @route  PUT api/users/current/username
// @desc   Change current username field
// @access Private
router.put(
  "/current/username",
  passport.authenticate("jwt", { session: false }),
  permission.check(),
  validation.validate("/current/username", "PUT"),
  (req, res) => {
    const success = {};
    const errors = {};

    if (req.body.username.name === req.user.username.name) {
      errors.badRequest = "The same username.";
      return res.status(400).json(errors);
    }
    new UsernameHistory({
      by: req.user.id,
      username: {
        userId: req.user.id.toString(),
        name: req.user.username.name,
        by: req.user.username.by,
        description: req.user.username.description
      }
    })
      .save()
      .then(() => {
        User.findByIdAndUpdate(
          req.user.id,
          {
            $set: {
              username: {
                by: req.user.id,
                name: req.body.username.name,
                description: req.body.username.description
              }
            }
          },
          { new: true }
        )
          .then(user => {
            //TODO: send an email for changing
            success.ok = "Updated.";
            res.json(success);
          })
          .catch(err => {
            errors.internalServerError = `Internal server error: ${err.name} ${
              err.message
            }.`;
            res.status(500).json(errors);
          });
      });
  }
);

// @role   all
// @route  PUT api/users/current/email
// @desc   Change current email field
// @access Private
router.put(
  "/current/email",
  passport.authenticate("jwt", { session: false }),
  permission.check(),
  validation.validate("/current/email", "PUT"),
  (req, res) => {
    const success = {};
    const errors = {};

    if (req.body.newEmail === req.body.email) {
      errors.badRequest = "The same email.";
      res.status(400).json(errors);
    } else if (req.body.email !== req.user.email) {
      errors.badRequest = "Email doesn't match.";
      res.status(400).json(errors);
    } else {
      new EmailHistory({
        by: req.user.id,
        email: {
          userId: req.user.id.toString(),
          email: req.user.email
        }
      })
        .save()
        .then(() => {
          User.findByIdAndUpdate(
            req.user.id,
            {
              $set: {
                email: req.body.newEmail
              }
            },
            { new: true }
          )
            .then(user => {
              //TODO: send an email for changing
              success.ok = "Updated.";
              res.json(success);
            })
            .catch(err => {
              errors.internalServerError = `Internal server error: ${
                err.name
              } ${err.message}.`;
              res.status(500).json(errors);
            });
        });
    }
  }
);

// @role   all
// @route  PUT api/users/current/password
// @desc   Change current password field
// @access Private
router.put(
  "/current/password",
  passport.authenticate("jwt", { session: false }),
  permission.check(),
  validation.validate("/current/password", "PUT"),
  (req, res) => {
    const success = {};
    const errors = {};

    if (req.body.newPassword === req.body.password) {
      errors.badRequest = "The same password.";
      return res.status(400).json(errors);
    }
    bcryptjs.compare(req.body.password, req.user.password).then(isMatch => {
      if (isMatch) {
        new PasswordHistory({
          by: req.user.id,
          password: {
            userId: req.user.id.toString(),
            password: req.user.password
          }
        })
          .save()
          .then(() => {
            bcryptjs.genSalt(10).then(salt => {
              bcryptjs
                .hash(req.body.newPassword, salt)
                .then(hash => {
                  req.body.newPassword = hash;
                })
                .then(() => {
                  User.findByIdAndUpdate(
                    req.user.id,
                    {
                      $set: {
                        password: req.body.newPassword
                      }
                    },
                    { new: true }
                  )
                    .then(user => {
                      //TODO: send an email for changing
                      success.ok = "Updated.";
                      res.json(success);
                    })
                    .catch(err => {
                      errors.internalServerError = `Internal server error: ${
                        err.name
                      } ${err.message}.`;
                      res.status(500).json(errors);
                    });
                });
            });
          });
      } else {
        errors.badRequest = "Password doesn't match.";
        res.status(400).json(errors);
      }
    });
  }
);

// @role   mod, supermod, admin
// @route  GET api/users/:userId
// @desc   Get user by userId
// @access Private
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  permission.check(),
  (req, res) => {
    errors = {};

    User.findById(req.params.userId)
      .then(user => {
        if (isEmpty(user)) {
          errors.notFound = "No user with that id.";
          res.status(404).json(errors);
        } else if (
          !permission.compareRoles(
            req.user.permission.role,
            user.permission.role
          )
        ) {
          errors.forbidden = "Not enough permissions.";
          res.status(403).json(errors);
        } else {
          const newUser = {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            frozen: user.frozen
          };
          if (permission.isMod(req.user.permission.role)) {
            res.json({
              permission: {
                role: user.permission.role
              },
              ...newUser
            });
          } else if (permission.isSupermod(req.user.permission.role)) {
            res.json({
              permission: user.permission,
              ...newUser
            });
          } else if (permission.isAdmin(req.user.permission.role)) {
            res.json(user);
          }
        }
      })
      .catch(err => {
        errors.internalServerError = `Internal server error: ${err.name} ${
          err.message
        }.`;
        res.status(500).json(errors);
      });
  }
);

// @role   mod, supermod, admin
// @route  PUT api/users/:userId/username
// @desc   Change username field by userId
// @access Private
router.put(
  "/:userId/username",
  passport.authenticate("jwt", { session: false }),
  permission.check(),
  validation.validate("/:userId/username", "PUT"),
  (req, res) => {
    const success = {};
    const errors = {};

    User.findById(req.params.userId)
      .then(user => {
        if (isEmpty(user)) {
          errors.notFound = "No user with that id.";
          res.status(404).json(errors);
        } else if (
          !permission.compareRoles(
            req.user.permission.role,
            user.permission.role
          )
        ) {
          errors.forbidden = "Not enough permissions.";
          res.status(403).json(errors);
        } else {
          req.body.username.name =
            "Noname_" +
            base58.encode(
              new Buffer.from(
                sha256(user.id + toString(Math.floor(Math.random() * 1000 + 1)))
              )
            );
          new UsernameHistory({
            by: req.user.id,
            username: {
              userId: user.id.toString(),
              name: user.username.name,
              by: user.username.by,
              description: user.username.description
            }
          })
            .save()
            .then(() => {
              User.findByIdAndUpdate(
                user.id,
                {
                  $set: {
                    username: {
                      by: req.user.id.toString(),
                      name: req.body.username.name,
                      description: req.body.username.description
                    }
                  }
                },
                { new: true }
              )
                .then(user => {
                  //TODO: send an email for changing
                  success.ok = "Updated.";
                  res.json(success);
                })
                .catch(err => {
                  errors.internalServerError = `Internal server error: ${
                    err.name
                  } ${err.message}.`;
                  res.status(500).json(errors);
                });
            });
        }
      })
      .catch(err => {
        errors.internalServerError = `Internal server error: ${err.name} ${
          err.message
        }.`;
        res.status(500).json(errors);
      });
  }
);

// @role   mod, supermod, admin
// @route  PUT api/users/:userId/avatar
// @desc   Change avatar field by userId
// @access Private
router.put(
  "/:userId/avatar",
  passport.authenticate("jwt", { session: false }),
  permission.check(),
  validation.validate("/:userId/avatar", "PUT"),
  (req, res) => {
    const success = {};
    const errors = {};

    User.findById(req.params.userId)
      .then(user => {
        if (isEmpty(user)) {
          errors.notFound = "No user with that id.";
          res.status(404).json(errors);
        } else if (
          !permission.compareRoles(
            req.user.permission.role,
            user.permission.role
          )
        ) {
          errors.forbidden = "Not enough permissions.";
          res.status(403).json(errors);
        } else {
          const updateUser = () => {
            User.findByIdAndUpdate(
              user.id,
              {
                $set: {
                  avatar: {
                    by: req.user.id,
                    image: {
                      buffer: req.body.avatar.image.buffer,
                      contentType: req.body.avatar.image.contentType,
                      encoding: req.body.avatar.image.encoding
                    },
                    description: req.body.avatar.description
                  }
                }
              },
              { new: true }
            )
              .then(user => {
                //TODO: send an email for changing
                success.ok = "Updated.";
                res.json(success);
              })
              .catch(err => {
                errors.internalServerError = `Internal server error: ${
                  err.name
                } ${err.message}.`;
                res.status(500).json(errors);
              });
          };
          if (user.avatar) {
            new AvatarHistory({
              by: req.user.id,
              avatar: {
                userId: user.id.toString(),
                image: user.avatar.image,
                from: user.avatar.from,
                by: user.avatar.by,
                description: user.avatar.description
              }
            })
              .save()
              .then(() => {
                updateUser();
              });
          } else {
            updateUser();
          }
        }
      })
      .catch(err => {
        errors.internalServerError = `Internal server error: ${err.name} ${
          err.message
        }.`;
        res.status(500).json(errors);
      });
  }
);

// @role   mod, supermod, admin
// @route  PUT api/users/:userId/frozen
// @desc   Change frozen field by userId
// @access Private
router.put(
  "/:userId/frozen",
  passport.authenticate("jwt", { session: false }),
  permission.check(),
  validation.validate("/:userId/frozen", "PUT"),
  (req, res) => {
    const success = {};
    const errors = {};

    User.findById(req.params.userId)
      .then(user => {
        if (isEmpty(user)) {
          errors.notFound = "No user with that id.";
          res.status(404).json(errors);
        } else if (
          (req.body.frozen.to === null &&
            !permission.isAdmin(req.user.permission.role)) ||
          (req.body.frozen.to &&
            !permission.compareRoles(
              req.user.permission.role,
              user.permission.role
            ))
        ) {
          errors.forbidden = "Not enough permissions.";
          res.status(403).json(errors);
        } else {
          const updateUser = () => {
            User.findByIdAndUpdate(
              user.id,
              {
                $set: {
                  frozen: {
                    by: req.user.id.toString(),
                    to: req.body.frozen.to
                      ? Date.now(Number(req.body.frozen.to))
                      : null,
                    description: req.body.frozen.description
                  }
                }
              },
              { new: true }
            )
              .then(user => {
                //TODO: send an email for changing
                success.ok = "Updated.";
                res.json(success);
              })
              .catch(err => {
                errors.internalServerError = `Internal server error: ${
                  err.name
                } ${err.message}.`;
                res.status(500).json(errors);
              });
          };
          if (user.frozen) {
            if (
              req.body.frozen.to &&
              user.frozen.to &&
              user.frozen.to > Date.now()
            ) {
              errors.forbidden = "This user already in freeze.";
              res.status(403).json(errors);
            } else if (
              (user.frozen.to && user.frozen.to < Date.now()) ||
              (req.body.frozen.to === null &&
                user.frozen.to &&
                user.frozen.to > Date.now())
            ) {
              new FrozenHistory({
                by: req.user.id,
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
                  updateUser();
                });
            } else if (req.body.frozen.to === null && user.frozen.to === null) {
              errors.badRequest =
                "Nothing to change. This user is not in freeze.";
              res.status(400).json(errors);
            } else {
              updateUser();
            }
          } else {
            if (req.body.frozen.to === null) {
              errors.badRequest =
                "Nothing to change. This user is not in freeze.";
              res.status(400).json(errors);
            } else {
              updateUser();
            }
          }
        }
      })
      .catch(err => {
        errors.internalServerError = `Internal server error: ${err.name} ${
          err.message
        }.`;
        res.status(500).json(errors);
      });
  }
);

// @role   mod, supermod, admin
// @route  PUT api/users/:userId/permission
// @desc   Change permission field by userId
// @access Private
router.put(
  "/:userId/permission",
  passport.authenticate("jwt", { session: false }),
  permission.check(),
  validation.validate("/:userId/permission", "PUT"),
  (req, res) => {
    const success = {};
    const errors = {};

    User.findById(req.params.userId)
      .then(user => {
        if (isEmpty(user)) {
          errors.notFound = "No user with that id.";
          res.status(404).json(errors);
        } else if (
          !permission.compareRoles(
            req.user.permission.role,
            user.permission.role
          )
        ) {
          errors.forbidden = "Not enough permissions.";
          res.status(403).json(errors);
        } else {
          if (permission.isAdmin(req.user.permission.role)) {
            if (req.body.permission.role === user.permission.role) {
              errors.badRequest = "The same role.";
              return res.status(400).json(errors);
            }
            new PermissionHistory({
              by: req.user.id,
              permission: {
                userId: user.id.toString(),
                role: user.permission.role,
                from: user.permission.from,
                by: user.permission.by,
                description: user.permission.description
              }
            })
              .save()
              .then(() => {
                User.findByIdAndUpdate(
                  user.id,
                  {
                    $set: {
                      permission: {
                        by: req.user.id.toString(),
                        role: req.body.permission.role,
                        description: req.body.permission.description
                      }
                    }
                  },
                  { new: true }
                )
                  .then(user => {
                    //TODO: send an email for changing
                    success.ok = "Updated.";
                    res.json(success);
                  })
                  .catch(err => {
                    errors.internalServerError = `Internal server error: ${
                      err.name
                    } ${err.message}.`;
                    res.status(500).json(errors);
                  });
              });
          } else {
            errors.forbidden = "Not enough permissions.";
            res.status(403).json(errors);
          }
        }
      })
      .catch(err => {
        errors.internalServerError = `Internal server error: ${err.name} ${
          err.message
        }.`;
        res.status(500).json(errors);
      });
  }
);

module.exports = router;
