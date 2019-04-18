module.exports = class Perm {
  constructor(permsFile) {
    this.permsFile = require(`./perms/${permsFile}`);
    this.roles = {
      user: 10,
      mod: 99,
      supermod: 100,
      admin: 1000
    };
  }

  check() {
    return (req, res, next) => {
      const errors = {};
      if (
        req.params &&
        req.params.userId &&
        req.user.id === req.params.userId
      ) {
        errors.forbidden = "Not enough permissions.";
        return res.status(403).json(errors);
      }
      const routePath = req.route.path;
      const method = req.method;
      const perm = this.permsFile.find(
        perm => perm.routePath === routePath && perm.method === method
      );
      if (perm) {
        if (perm.isRole) {
          if (
            perm.role[req.user.permission.role] &&
            perm.role[req.user.permission.role].access
          ) {
            next();
          } else {
            errors.forbidden = "Not enough permissions.";
            res.status(403).json(errors);
          }
        } else {
          next();
        }
      } else {
        //TODO: Alert! Some apis not under permission control!!!
      }
    };
  }

  compareRoles(init, target) {
    return this.roles[init] > this.roles[target];
  }

  isMod(role) {
    return role === "mod";
  }

  isSupermod(role) {
    return role === "supermod";
  }

  isAdmin(role) {
    return role === "admin";
  }
};
