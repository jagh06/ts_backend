const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

const validatorCreateItem = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 50 }),
  check("lastname").exists().notEmpty().isLength({ min: 3, max: 50 }),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 50 }),
  check("phone").exists().notEmpty().isLength({ min: 13, max: 20 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetItem = [
  check("id").exists().notEmpty().isMongoId(),
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

const validatorLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 20 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorRecover = [
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorToken = [
  check("token").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorCreateItem,
  validatorGetItem,
  validatorLogin,
  validatorGetItemEmail,
  validatorRecover,
  validatorToken 
};
