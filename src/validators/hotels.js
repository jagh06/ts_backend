const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");


const validatorCreateItem = [
    check("owner").exists().notEmpty(),
    check("owner.name").exists().notEmpty(),
    check("owner.lastname").exists().notEmpty(),
    check("owner.email").exists().notEmpty(),
    check("namehotel").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("description").exists().notEmpty().isLength({ min: 10, max: 100 }),
    check("price").exists().notEmpty(),
    check("location").exists().notEmpty(),
    check("location.postalcode").exists().notEmpty(),
    check("location.street").exists().notEmpty(),
    check("location.streetnumber").exists().notEmpty(),
    check("location.city").exists().notEmpty(),
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

module.exports = { validatorCreateItem, validatorGetItem }