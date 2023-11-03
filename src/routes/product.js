const upload = require('../config/multer')
const express = require("express");
const { createItem } = require("../controllers/product")
const router = express.Router();

router.post("/", upload.array('images'), createItem)


module.exports = router;