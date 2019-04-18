module.exports = class Valid {
  constructor(validsFile) {
    this.validsFile = require(`./valids/${validsFile}`);
  }

  validate(routePath, method) {
    const valid = this.validsFile.find(
      valid => valid.routePath === routePath && valid.method === method
    );
    return valid.validate;
  }
};
