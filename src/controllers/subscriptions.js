const { matchedData } = require("express-validator");
const { subscriptionModel } = require("../models");
const { handleHttpError } = require("../utils/handleHttpError");

const getItems = async (req, res) => {
  try {
    const data = await subscriptionModel.findById({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_SUBSCRIPTIONS");
  }
};

const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await subscriptionModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_SUBSCRIPTION");
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await subscriptionModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_SUBSCRIPTION");
  }
};

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await subscriptionModel.delete({ _id: id });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_SUBSCRIPTION");
  }
};

module.exports = { getItems, getItem, createItem, deleteItem};
