const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");


const validatorCreateItem = [
    check("nameowner").exists().notEmpty(),
    check("lastnameowner").exists().notEmpty(),
    check("emailowner").exists().notEmpty().isEmail(),
    check("namehotel").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("description").exists().notEmpty().isLength({ min: 10, max: 100 }),
    check("price").exists().notEmpty(),
    check("postalcode").exists().notEmpty(),
    check("street").exists().notEmpty(),
    check("streetnumber").exists().notEmpty(),
    check("city").exists().notEmpty(),
    check("phone").exists().notEmpty(),
    //check("images").exists().notEmpty(),
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

const validatorGetItemEmail = [
    check("email").exists().notEmpty().isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateItem, validatorGetItem, validatorGetItemEmail  }