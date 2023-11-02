const express = require('express');
const { createItem, getItems, getItem, updateItem, deleteItem } = require('../controllers/clients');
const { validatorCreateItem, validatorGetItem } = require('../validators/clients');
const router = express.Router();

//create client
router.post("/", validatorCreateItem, createItem);


//get all clients
router.get("/", getItems);


//get client
router.get("/:id", validatorGetItem, getItem);


//update client
router.put("/:id", validatorGetItem, updateItem);

//delete client
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;

