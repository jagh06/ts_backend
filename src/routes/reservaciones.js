const express = require("express");
const { createItem, getItems, getItem, deleteItem } = require("../controllers/reservaciones");
const router = express.Router();

// create
router.post("/", createItem);

// get all
router.get("/", getItems)
// get all
router.get("/iduser/:iduser", getItem)

//delete 
router.delete("/delete/:id", deleteItem);

module.exports = router;