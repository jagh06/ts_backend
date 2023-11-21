const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

const validatorCreateItem = [
  check("plan").exists().notEmpty().isLength({ min: 15, max: 50 }),
  check("email").exists().notEmpty().isEmail(),
  check("phone").exists().notEmpty().isLength({ min: 15, max: 50 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetItemEmail = [
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorCreateItem,
  validatorGetItemEmail,
};
