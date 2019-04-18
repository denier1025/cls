module.exports = [
  {
    path: "/api/users",
    routePath: "/",
    method: "GET",
    isRole: true,
    role: {
      user: {
        access: false
      },
      mod: {
        access: false
      },
      supermod: {
        access: false
      },
      admin: {
        access: true
      }
    }
  },
  {
    path: "/api/users/current",
    routePath: "/current",
    method: "GET",
    isRole: true,
    role: {
      user: {
        access: true
      },
      mod: {
        access: true
      },
      supermod: {
        access: true
      },
      admin: {
        access: true
      }
    }
  },
  {
    path: "/api/users/current/username",
    routePath: "/current/username",
    method: "PUT",
    isRole: true,
    role: {
      user: {
        access: true
      },
      mod: {
        access: true
      },
      supermod: {
        access: true
      },
      admin: {
        access: true
      }
    }
  },
  {
    path: "/api/users/current/email",
    routePath: "/current/email",
    method: "PUT",
    isRole: true,
    role: {
      user: {
        access: true
      },
      mod: {
        access: true
      },
      supermod: {
        access: true
      },
      admin: {
        access: true
      }
    }
  },
  {
    path: "/api/users/current/password",
    routePath: "/current/password",
    method: "PUT",
    isRole: true,
    role: {
      user: {
        access: true
      },
      mod: {
        access: true
      },
      supermod: {
        access: true
      },
      admin: {
        access: true
      }
    }
  },
  {
    path: "/api/users/:userId",
    routePath: "/:userId",
    method: "GET",
    isRole: true,
    role: {
      user: {
        access: false
      },
      mod: {
        access: true
      },
      supermod: {
        access: true
      },
      admin: {
        access: true
      }
    }
  },
  {
    path: "/api/users/:userId/username",
    routePath: "/:userId/username",
    method: "PUT",
    isRole: true,
    role: {
      user: {
        access: false
      },
      mod: {
        access: true
      },
      supermod: {
        access: true
      },
      admin: {
        access: true
      }
    }
  },
  {
    path: "/api/users/:userId/avatar",
    routePath: "/:userId/avatar",
    method: "PUT",
    isRole: true,
    role: {
      user: {
        access: false
      },
      mod: {
        access: true
      },
      supermod: {
        access: true
      },
      admin: {
        access: true
      }
    }
  },
  {
    path: "/api/users/:userId/frozen",
    routePath: "/:userId/frozen",
    method: "PUT",
    isRole: true,
    role: {
      user: {
        access: false
      },
      mod: {
        access: true
      },
      supermod: {
        access: true
      },
      admin: {
        access: true
      }
    }
  },
  {
    path: "/api/users/:userId/permission",
    routePath: "/:userId/permission",
    method: "PUT",
    isRole: true,
    role: {
      user: {
        access: false
      },
      mod: {
        access: true
      },
      supermod: {
        access: true
      },
      admin: {
        access: true
      }
    }
  }
];
