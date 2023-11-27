const express = require("express");
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  getItemEmail,
  getItemForUser
} = require("../controllers/hotels");
const {
  validatorCreateItem,
  validatorGetItem,
  validatorGetItemEmail 
} = require("../validators/hotels");
const upload = require('../config/multer');
const authMiddleware = require("../middlewares/session");
const { checkRol } = require("../middlewares/rol");
const router = express.Router();

//create hotel
router.post("/", authMiddleware, checkRol(["admin"]), upload.array('images'), createItem);

//get all hotels
router.get("/", getItems);

//get hotel
router.get("/getforuser/:id", validatorGetItem, getItemForUser);

//get hotel
router.get("/:id", authMiddleware, validatorGetItem, getItem);

//get hotel
router.get("/email/:email", authMiddleware, validatorGetItemEmail, getItemEmail);

//update hotel
router.put("/:id", authMiddleware, validatorGetItem, updateItem);

//delete hotel
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
