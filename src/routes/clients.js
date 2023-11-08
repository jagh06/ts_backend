const express = require("express");
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  loginItem,
  getItemEmail,
} = require("../controllers/clients");
const {
  validatorCreateItem,
  validatorGetItem,
  validatorLogin,
  validatorGetItemEmail,
} = require("../validators/clients");
const router = express.Router();

//create client
router.post("/", validatorCreateItem, createItem);

//login
router.post("/login", validatorLogin, loginItem);

//get all clients
router.get("/", getItems);

//get client
router.get("/:id", validatorGetItem, getItem);

//get client email
router.get("/email/:email", validatorGetItemEmail, getItemEmail);

//update client
router.put("/:id", validatorGetItem, updateItem);

//delete client
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;
