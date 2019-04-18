module.exports = Roles = {
  USER: 10,
  MOD: 99,
  SUPERMOD: 100,
  ADMIN: 1000,
  props: {
    10: "user",
    99: "mod",
    100: "supermod",
    1000: "admin"
  },
  reverseProps: {
      user: 10,
      mod: 99,
      supermod: 100,
      admin: 1000
  }
};
