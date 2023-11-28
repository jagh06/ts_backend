const express = require("express");
const {
  createItem,
  getItems,
  getItem,
  deleteItem,
  getItemEmailOwner,
} = require("../controllers/reservaciones");
const router = express.Router();

// create
router.post("/", createItem);

// get all
router.get("/", getItems);

// get all id user
router.get("/iduser/:iduser", getItem);

// get all email client
router.get("/emailclient/:email", getItemEmailOwner);

//delete
router.delete("/delete/:id", deleteItem);

module.exports = router;
