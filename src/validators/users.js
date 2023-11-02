const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

const validatorCreateItem = [
  check("name").exists().notEmpty().isLength({ min: 5, max: 50 }),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 6, max: 50 }),
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

module.exports = { validatorCreateItem, validatorGetItem };
