const express = require("express");
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  loginItem,
} = require("../controllers/clients");
const {
  validatorCreateItem,
  validatorGetItem,
  validatorLogin,
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

//update client
router.put("/:id", validatorGetItem, updateItem);

//delete client
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;
