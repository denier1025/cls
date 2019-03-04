module.exports = Roles = {
  USER: 10,
  MOD: 50,
  SUPERMOD: 60,
  ADMIN: 100,
  props: {
    10: "user",
    50: "mod",
    60: "supermod",
    100: "admin"
  },
  reverseProps: {
      user: 10,
      mod: 50,
      supermod: 60,
      admin: 100
  }
};
