const express = require("express");
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/hotels");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/hotels");
const upload = require('../config/multer')
const router = express.Router();

//create hotel
router.post("/", upload.array('images'), createItem);

//get all hotels
router.get("/", getItems);

//get hotel
router.get("/:id", validatorGetItem, getItem);

//update hotel
router.put("/:id", validatorGetItem, updateItem);

//delete hotel
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;
