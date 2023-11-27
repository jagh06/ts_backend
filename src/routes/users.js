const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  loginItem 
} = require("../controllers/users");

//middlewares
const { validatorGetItem, validatorCreateItem, validatorLogin } = require("../validators/users");
const router = express.Router();

// create user
router.post("/newuser/", validatorCreateItem, createItem);

//login
router.post("/login", validatorLogin, loginItem);

//get all users
router.get("/", getItems);

//get user
router.get("/:id", validatorGetItem, getItem);

//update user
router.put("/:id", validatorGetItem, updateItem);

//delete user
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;
