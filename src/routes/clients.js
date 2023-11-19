const express = require("express");
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  loginItem,
  getItemEmail,
  recoverPassword,
  verifyTokenJWTRecoverPassword
} = require("../controllers/clients");
const {
  validatorCreateItem,
  validatorGetItem,
  validatorLogin,
  validatorGetItemEmail,
  validatorRecover,
  validatorToken
} = require("../validators/clients");
const router = express.Router();

//create account
router.post("/", validatorCreateItem, createItem);

//login
router.post("/login", validatorLogin, loginItem);

//recuperado de password
router.post("/recover", validatorRecover, recoverPassword);

//verify token jwt recorer password
router.post("/veriftokenjwt", validatorToken, verifyTokenJWTRecoverPassword)

//get all clients
router.get("/", getItems);

//get client
router.get("/id/:id", validatorGetItem, getItem);

//get client email
router.get("/email/:email", validatorGetItemEmail, getItemEmail);

//update client
router.put("/:id", validatorGetItem, updateItem);

//delete client
router.delete("/:id", validatorGetItem, deleteItem);



module.exports = router;
