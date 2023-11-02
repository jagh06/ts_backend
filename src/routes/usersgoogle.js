const express = require('express');
const { createItem, getItems, getItem, deleteItem } = require('../controllers/usersgoogle');
const { validatorCreateItem, validatorGetItem, validatorGetItemEmail } = require('../validators/usersgoogle');
const router = express.Router();

// create user google
router.post("/", validatorCreateItem, createItem);

// get users google
router.get("/", getItems);

// get user google
router.get("/:email", validatorGetItemEmail, getItem);

// delete user google
router.delete("/:id",  validatorGetItem, deleteItem);


module.exports = router;