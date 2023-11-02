const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/users");

//middlewares
const { validatorGetItem, validatorCreateItem } = require("../validators/users");
const router = express.Router();

// create user
router.post("/", validatorCreateItem, createItem);

//get all users
router.get("/", getItems);

//get user
router.get("/:id", validatorGetItem, getItem);

//update user
router.put("/:id", validatorGetItem, updateItem);

//delete user
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;
