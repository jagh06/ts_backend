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
const upload = require('../config/multer');
const authMiddleware = require("../middlewares/session");
const { checkRol } = require("../middlewares/rol");
const router = express.Router();

//create hotel
router.post("/", authMiddleware, checkRol(["admin"]), upload.array('images'), createItem);

//get all hotels
router.get("/", authMiddleware, getItems);

//get hotel
router.get("/:id", authMiddleware, validatorGetItem, getItem);

//update hotel
router.put("/:id", authMiddleware, validatorGetItem, updateItem);

//delete hotel
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
