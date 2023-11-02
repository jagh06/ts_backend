const upload = require('../config/multer')
const express = require("express");
const { createItem } = require("../controllers/product")
const router = express.Router();

router.post("/", upload.array('images'), createItem)

//router.put("/:id", upload.array('files', 10), productSchema, update);

module.exports = router;