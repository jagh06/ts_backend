const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");


const validatorCreateItem = [
    check("name").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("lastname").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("phone").exists().notEmpty().isLength({ min: 10, max: 20 }),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 3, max: 20 }),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateItem, validatorGetItem, validatorLogin }