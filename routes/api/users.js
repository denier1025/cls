const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const FrozenHistory = mongoose.model("FrozenHistory");
const UsernameHistory = mongoose.model("UsernameHistory");
const AvatarHistory = mongoose.model("AvatarHistory");
const PermissionHistory = mongoose.model("PermissionHistory");
const EmailHistory = mongoose.model("EmailHistory");
const PasswordHistory = mongoose.model("PasswordHistory");

const validateUserInput = require("../validation/user");
const isEmpty = require("../validation/isEmpty");
const Roles = require("../utils/roles");

// @role   all(user, mod, supermod, admin)
// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) =>
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar,
      permission: {
        role: req.user.permission.role
      }
    })
);

// @role   all(user, mod, supermod, admin)
// @route  DELETE api/users/current
// @desc   Logout current user
// @access Private
//TODO: block JWT tokens from redis until exp date

// @role   all(user, mod, supermod, admin)
// @route  PUT api/users/current
// @desc   Modify one of the current fields (username/email/password/avatar)
// @access Private
router.put(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    errors = {}; //TODO: stay without validation

    //TODO:
    // const { errors, isValid } = validateUserInput(req.body);

    // if(!isValid) {
    //   errors.badRequest = "Validation failed."
    //   return res.status(400).json(errors);
    // }

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
            ).then(user => {
              //TODO: send an email for changing
              res.json(user);
            })
            .catch(err => {
              if(err.name === "MongoError") {
                errors.conflict = "Not unique."
                res.status(409).json(errors);
              }
            });
          };
          if (req.body.username && Object.keys(req.body).length === 1) {
            if(req.body.username === user.username) {
              errors.conflict = "The same username.";
              return res.status(409).json(errors);
            }
            new UsernameHistory({
              by: req.user.id,
              username: {
                userId: user.id.toString(),
                username: user.username
              }
            })
              .save()
              .then(() => {
                updateUser(req.body);
              });
          } else if (req.body.email && req.body.newEmail && Object.keys(req.body).length === 2) {
            if(req.body.newEmail === user.email) {
              errors.conflict = "The same email.";
              return res.status(409).json(errors);
            }
            if(req.body.email === user.email) {
              new EmailHistory({
                by: req.user.id,
                email: {
                  userId: user.id.toString(),
                  email: user.email
                }
              })
                .save()
                .then(() => {
                  updateUser({email: req.body.newEmail});
                });
            } else {
              errors.email = "Incorrect email.";
              errors.badRequest = "Email doesn't match."
              res.status(400).json(errors);
            }
          } else if (req.body.password && req.body.newPassword && Object.keys(req.body).length === 2) {
            bcryptjs.genSalt(10).then(salt => {
              bcryptjs.hash(req.body.newPassword, salt).then(hash => {
                req.body.newPassword = hash;
              });
            });
            if(req.body.newPassword === user.password) {
              errors.conflict = "The same password.";
              return res.status(409).json(errors);
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
                    updateUser({password: req.body.newPassword}); 
                  });
              } else {
                errors.password = "Incorrect password.";
                errors.badRequest = "Password doesn't match."
                res.status(400).json(errors);
              }
            })
          } else if (req.body.avatar && Object.keys(req.body).length === 1) {
            if(req.body.avatar.image === user.avatar.image) {
              errors.conflict = "The same avatar.";
              return res.status(409).json(errors);
            }
            if (req.user.avatar) {
              new AvatarHistory({
                by: req.user.id,
                avatar: {
                  userId: user.id.toString(),
                  image: user.avatar.image,
                  contentType: user.avatar.contentType,
                  encoding: user.avatar.encoding,
                  from: user.avatar.from,
                  by: user.avatar.by
                }
              })
                .save()
                .then(() => {
                  updateUser(req.body);
                });
            } else {
              updateUser(req.body);
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

// @role   all(user, mod, supermod, admin)
// @route  DELETE api/users/current/avatar
// @desc   Delete avatar field
// @access Private
router.delete(
  "/current/avatar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    errors = {};

    User.findById(req.user.id)
      .then(user => {
        if (isEmpty(user)) {
          errors.notFound = "No user with that id.";
          res.status(404).json(errors);
        } else {
          if (req.user.avatar) {
            new AvatarHistory({
              by: req.user.id,
              avatar: {
                userId: user.id.toString(),
                image: user.avatar.image,
                contentType: user.avatar.contentType,
                encoding: user.avatar.encoding,
                from: user.avatar.from,
                by: user.avatar.by
              }
            })
              .save()
              .then(() => {
                User.findByIdAndUpdate(
                  req.user.id,
                  {
                    $set: {
                      avatar: null
                    }
                  },
                  { new: true }
                ).then(user => {
                  //TODO: send an email for changing
                  res.json(user);
                });
              });
          } else {
            errors.badRequest = "Nothing to change. Avatar field is empty.";
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

// @role   mod, supermod, admin
// @route  GET api/users/:userIdentifier
// @desc   Get user by userIdentifier
// @access Private
router.get(
  "/:userIdentifier",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    errors = {};

    if (
      ![
        Roles.props[Roles.MOD],
        Roles.props[Roles.SUPERMOD],
        Roles.props[Roles.ADMIN]
      ].includes(req.user.permission.role)
    ) {
      errors.forbidden = "API is not allowed.";
      return res.status(403).json(errors);
    }

    if (mongoose.Types.ObjectId.isValid(req.params.userIdentifier)) {
      User.findById(req.params.userIdentifier)
        .then(user => {
          if (isEmpty(user)) {
            errors.notFound = "No user with that id.";
            res.status(404).json(errors);
          } else if (
            Roles.reverseProps[req.user.permission.role] &&
            Roles.reverseProps[req.user.permission.role] <
              Roles.reverseProps[user.permission.role]
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
            if (req.user.permission.role === Roles.props[Roles.MOD]) {
              res.json({
                permission: {
                  role: user.permission.role
                },
                ...newUser
              });
            } else if (
              req.user.permission.role === Roles.props[Roles.SUPERMOD]
            ) {
              res.json({
                permission: user.permission,
                ...newUser
              });
            } else if (req.user.permission.role === Roles.props[Roles.ADMIN]) {
              res.json({
                email: user.email,
                password: user.password,
                permission: user.permission,
                from: user.from,
                ...newUser
              });
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
    } else {
      User.findOne({ username: req.params.userIdentifier })
        .then(user => {
          if (isEmpty(user)) {
            errors.notFound = "No user with that username.";
            res.status(404).json(errors);
          } else if (
            Roles.reverseProps[req.user.permission.role] &&
            Roles.reverseProps[req.user.permission.role] <
              Roles.reverseProps[user.permission.role]
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
            if (req.user.permission.role === Roles.props[Roles.MOD]) {
              res.json({
                permission: {
                  role: user.permission.role
                },
                ...newUser
              });
            } else if (
              req.user.permission.role === Roles.props[Roles.SUPERMOD]
            ) {
              res.json({
                permission: user.permission,
                ...newUser
              });
            } else if (req.user.permission.role === Roles.props[Roles.ADMIN]) {
              res.json({
                email: user.email,
                password: user.password,
                permission: user.permission,
                from: user.from,
                ...newUser
              });
            }
          }
        })
        .catch(err => {
          if (err.name === "CastError") {
            errors.notFound = "No user with that username.";
            res.status(404).json(errors);
          } else {
            errors.internalServerError = `Internal server error: ${err.name} ${
              err.message
            }.`;
            res.status(500).json(errors);
          }
        });
    }
  }
);

// @role   mod, supermod, admin
// @route  PUT api/users/:userIdentifier
// @desc   Modify one of the user's fields by userIdentifier (username/avatar/frozen/permission)
// @access Private
router.put(
  "/:userIdentifier",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    errors = {}; //TODO: stay without validation

    //TODO:
    // const { errors, isValid } = validateUserInput(req.body);

    // if(!isValid) {
    //   errors.badRequest = "Validation failed."
    //   return res.status(400).json(errors);
    // }

    const userIdentifier = mongoose.Types.ObjectId.isValid(
      req.params.userIdentifier
    );

    if (userIdentifier) {
      if (
        req.user.id === req.params.userIdentifier ||
        ![
          Roles.props[Roles.MOD],
          Roles.props[Roles.SUPERMOD],
          Roles.props[Roles.ADMIN]
        ].includes(req.user.permission.role)
      ) {
        errors.forbidden = "API is not allowed.";
        return res.status(403).json(errors);
      }
    } else {
      if (
        req.user.username === req.params.userIdentifier ||
        ![
          Roles.props[Roles.MOD],
          Roles.props[Roles.SUPERMOD],
          Roles.props[Roles.ADMIN]
        ].includes(req.user.permission.role)
      ) {
        errors.forbidden = "API is not allowed.";
        return res.status(403).json(errors);
      }
    }

    if (userIdentifier) {
      User.findById(req.params.userIdentifier)
        .then(user => {
          if (isEmpty(user)) {
            errors.notFound = "No user with that id.";
            res.status(404).json(errors);
          } else if (
            Roles.reverseProps[req.user.permission.role] &&
            Roles.reverseProps[req.user.permission.role] <=
              Roles.reverseProps[user.permission.role]
          ) {
            errors.forbidden = "Not enough permissions.";
            res.status(403).json(errors);
          } else {
            const updateUser = userData => {
              User.findByIdAndUpdate(
                req.params.userIdentifier,
                {
                  $set: {
                    ...userData
                  }
                },
                { new: true }
              ).then(user => {
                //TODO: send an email for changing
                res.json(user);
              })
              .catch(err => {
                if(err.name === "MongoError") {
                  errors.conflict = "Not unique."
                  res.status(409).json(errors);
                }
              });
            };
            if (req.body.username && Object.keys(req.body).length === 1) {
              if(req.body.username === user.username) {
                errors.conflict = "The same username.";
                return res.status(409).json(errors);
              }
              new UsernameHistory({
                by: req.user.id,
                username: {
                  userId: user.id.toString(),
                  username: user.username
                }
              })
                .save()
                .then(() => {
                  updateUser(req.body);
                });
            } else if (req.body.avatar && Object.keys(req.body).length === 1) {
              if(req.body.avatar.image === user.avatar.image) {
                errors.conflict = "The same avatar.";
                return res.status(409).json(errors);
              }
              if (user.avatar) {
                new AvatarHistory({
                  by: req.user.id,
                  avatar: {
                    userId: user.id.toString(),
                    image: user.avatar.image,
                    contentType: user.avatar.contentType,
                    encoding: user.avatar.encoding,
                    from: user.avatar.from,
                    by: user.avatar.by
                  }
                })
                  .save()
                  .then(() => {
                    updateUser(req.body);
                  });
              } else {
                updateUser(req.body);
              }
            } else if (req.body.frozen && Object.keys(req.body).length === 1) {
              if (user.frozen) {
                if (user.frozen.to > Date.now()) {
                  errors.forbidden = "That user already in freeze.";
                  res.status(403).json(errors);
                } else if (user.frozen.to < Date.now()) {
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
                      updateUser(req.body);
                    });
                } else {
                  updateUser(req.body);
                }
              }
            } else if (
              req.body.permission &&
              Object.keys(req.body).length === 1
            ) {
              if (
                [
                  Roles.props[Roles.SUPERMOD],
                  Roles.props[Roles.ADMIN]
                ].includes(req.user.permission.role)
              ) {
                if(req.body.permission.role === user.permission.role) {
                  errors.conflict = "The same role.";
                  return res.status(409).json(errors);
                }
                new PermissionHistory({
                  by: req.user.id,
                  permission: {
                    userId: user.id.toString(),
                    role: user.permission.role,
                    from: user.permission.from,
                    by: user.permission.by
                  }
                })
                  .save()
                  .then(() => {
                    updateUser(req.body);
                  });
              } else {
                errors.forbidden = "Not enough permissions.";
                res.status(403).json(errors);
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
    } else {
      User.findOne({ username: req.params.userIdentifier })
        .then(user => {
          if (isEmpty(user)) {
            errors.notFound = "No user with that username.";
            res.status(404).json(errors);
          } else if (
            Roles.reverseProps[req.user.permission.role] &&
            Roles.reverseProps[req.user.permission.role] <=
              Roles.reverseProps[user.permission.role]
          ) {
            errors.forbidden = "Not enough permissions.";
            res.status(403).json(errors);
          } else {
            const updateUser = userData => {
              User.findOneAndUpdate(
                { username: req.params.userIdentifier },
                {
                  $set: {
                    ...userData
                  }
                },
                { new: true }
              ).then(user => {
                //TODO: send an email for changing
                res.json(user);
              })
              .catch(err => {
                if(err.name === "MongoError") {
                  errors.conflict = "Not unique."
                  res.status(409).json(errors);
                }
              });
            };
            if (req.body.username) {
              if(req.body.username === user.username) {
                errors.conflict = "The same username.";
                return res.status(409).json(errors);
              }
              new UsernameHistory({
                by: req.user.id,
                username: {
                  userId: user.id.toString(),
                  username: user.username
                }
              })
                .save()
                .then(() => {
                  updateUser(req.body);
                });
            } else if (req.body.avatar) {
              if(req.body.avatar.image === user.avatar.image) {
                errors.conflict = "The same avatar.";
                return res.status(409).json(errors);
              }
              if (user.avatar) {
                new AvatarHistory({
                  by: req.user.id,
                  avatar: {
                    userId: user.id.toString(),
                    image: user.avatar.image,
                    contentType: user.avatar.contentType,
                    encoding: user.avatar.encoding,
                    from: user.avatar.from,
                    by: user.avatar.by
                  }
                })
                  .save()
                  .then(() => {
                    updateUser(req.body);
                  });
              } else {
                updateUser(req.body);
              }
            } else if (req.body.frozen) {
              if (user.frozen) {
                if (user.frozen.to > Date.now()) {
                  errors.forbidden = "That user already in freeze.";
                  res.status(403).json(errors);
                } else if (user.frozen.to < Date.now()) {
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
                      updateUser(req.body);
                    });
                } else {
                  updateUser(req.body);
                }
              }
            } else if (req.body.permission) {
              if (
                [
                  Roles.props[Roles.SUPERMOD],
                  Roles.props[Roles.ADMIN]
                ].includes(req.user.permission.role)
              ) {
                if(req.body.permission.role === user.permission.role) {
                  errors.conflict = "The same role.";
                  return res.status(409).json(errors);
                }
                new PermissionHistory({
                  by: req.user.id,
                  permission: {
                    userId: user.id.toString(),
                    role: user.permission.role,
                    from: user.permission.from,
                    by: user.permission.by
                  }
                })
                  .save()
                  .then(() => {
                    updateUser(req.body);
                  });
              } else {
                errors.forbidden = "Not enough permissions.";
                res.status(403).json(errors);
              }
            } else {
              errors.user = userData;
              errors.badRequest = "Incorrect data.";
              res.status(400).json(errors);
            }
          }
        })
        .catch(err => {
          if (err.name === "CastError") {
            errors.notFound = "No user with that username.";
            res.status(404).json(errors);
          } else {
            errors.internalServerError = `Internal server error: ${err.name} ${
              err.message
            }.`;
            res.status(500).json(errors);
          }
        });
    }
  }
);

// @role   admin
// @route  GET api/users
// @desc   Get all users
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    errors = {};

    if (!(req.user.permission.role === Roles.props[Roles.ADMIN])) {
      errors.forbidden = "API is not allowed.";
      return res.status(403).json(errors);
    }

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

// @role   admin
// @route  DELETE api/users/:userIdentifier/frozen
// @desc   Delete frozen field by userIdentifier
// @access Private
router.delete(
  "/:userIdentifier/frozen",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    errors = {};

    if (!(req.user.permission.role === Roles.props[Roles.ADMIN])) {
      errors.forbidden = "API is not allowed.";
      return res.status(403).json(errors);
    }

    if (mongoose.Types.ObjectId.isValid(req.params.userIdentifier)) {
      User.findById(req.params.userIdentifier)
        .then(user => {
          if (isEmpty(user)) {
            errors.notFound = "No user with that id.";
            res.status(404).json(errors);
          } else {
            const updateUser = () => {
              User.findByIdAndUpdate(
                req.params.userIdentifier,
                {
                  $set: {
                    frozen: null
                  }
                },
                { new: true }
              ).then(user => {
                //TODO: send an email for changing
                res.json(user);
              });
            };
            if (user.frozen) {
              new FrozenHistory({
                by: req.user.id,
                frozen: {
                  user: user.id.toString(),
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
            } else {
              errors.badRequest = "Nothing to change. User is not in freeze.";
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
    } else {
      User.findOne({ username: req.params.userIdentifier })
        .then(user => {
          if (isEmpty(user)) {
            errors.notFound = "No user with that username.";
            res.status(404).json(errors);
          } else {
            const updateUser = () => {
              User.findOneAndUpdate(
                { username: req.params.userIdentifier },
                {
                  $set: {
                    frozen: null
                  }
                },
                { new: true }
              ).then(user => {
                //TODO: send an email for changing
                res.json(user);
              });
            };
            if (user.frozen) {
              new FrozenHistory({
                by: req.user.id,
                frozen: {
                  user: user.id.toString(),
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
            } else {
              errors.badRequest = "Nothing to change. User is not in freeze.";
              res.status(400).json(errors);
            }
          }
        })
        .catch(err => {
          if (err.name === "CastError") {
            errors.notFound = "No user with that username.";
            res.status(404).json(errors);
          } else {
            errors.internalServerError = `Internal server error: ${err.name} ${
              err.message
            }.`;
            res.status(500).json(errors);
          }
        });
    }
  }
);

module.exports = router;
