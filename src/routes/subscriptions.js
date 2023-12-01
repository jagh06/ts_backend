const express = require("express");
const { createItem, getItems, getItem, deleteItem } = require("../controllers/subscriptions");
const { validatorCreateItem } = require("../validators/subscrptions");
const authMiddleware = require("../middlewares/session");
const { checkRol } = require("../middlewares/rol");
const { getStrapiInfo, postCheckOutStrapi, getSuscriptionsList, cancelledSubscriptionTest} = require("../strapi/route")
const router = express.Router();

// create item
router.post("/",createItem)

// get strpi info
router.get("/strapi-data", getStrapiInfo)

// post checkout plan
router.post("/strapi-checkout", postCheckOutStrapi)

//list suscriptores
router.get("/listar-suscriptores", getSuscriptionsList)

// get items
router.get("/", getItems);

// get item
router.get("/:email", getItem);

// delete item
router.delete("/:email", authMiddleware, checkRol(["admin"]), deleteItem);

//cancelled subscription
router.post("/test_cancel/", cancelledSubscriptionTest )

module.exports = router;