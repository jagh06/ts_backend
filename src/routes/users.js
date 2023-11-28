const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  loginItem,
  getItemEmail,
  updateItemPassword
} = require("../controllers/users");

//middlewares
const { validatorGetItem, validatorCreateItem, validatorLogin, validatorGetItemEmail } = require("../validators/users");
const router = express.Router();

// create user
router.post("/newuser/", validatorCreateItem, createItem);

//login
router.post("/login", validatorLogin, loginItem);

//get all users
router.get("/", getItems);

//get user
router.get("/:id", validatorGetItem, getItem);

//get user
router.get("/email/:email", validatorGetItemEmail, getItemEmail);

//update user
router.put("/:id", validatorGetItem, updateItem);
//update password user
router.put("/newpassword/:id", validatorGetItem, updateItemPassword);

//delete user
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;
