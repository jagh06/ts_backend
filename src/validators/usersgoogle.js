const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

const validatorCreateItem = [
  check("name").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
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

module.exports = { validatorCreateItem, validatorGetItem, validatorGetItemEmail };