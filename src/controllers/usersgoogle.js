const { matchedData } = require("express-validator");
const { userGoogleModel } = require("../models");
const { handleHttpError } = require("../utils/handleHttpError");

const getItems = async (req, res) => {
  try {
    const data = await userGoogleModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try {
    const { email } = req.params;
    const data = await userGoogleModel.findOne({email: email}); // finById para buscar con id
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await userGoogleModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await userGoogleModel.delete({ _id: id });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, deleteItem };
