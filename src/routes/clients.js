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
  verifyTokenJWTRecoverPassword,
  updatePasswordItem
} = require("../controllers/clients");
const {
  validatorCreateItem,
  validatorGetItem,
  validatorLogin,
  validatorGetItemEmail,
  validatorRecover,
  validatorToken
} = require("../validators/clients");
const authMiddleware = require("../middlewares/session");
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
router.put("/:id", authMiddleware, validatorGetItem, updateItem);

//update passowrd client
router.put("/resetpassword/:id", authMiddleware, validatorGetItem, updatePasswordItem);

//delete client
router.delete("/:id", validatorGetItem, deleteItem);



module.exports = router;
