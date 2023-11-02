const { matchedData } = require("express-validator");
const { clientModel } = require("../models");
const { handleHttpError } = require("../utils/handleHttpError");

const getItems = async (req, res) => {
  try {
    const data = await clientModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await clientModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await clientModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

const updateItem = async (req, res) => {
    try {
        const data = await clientModel.findByIdAndUpdate(req.params.id, req.body);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_ITEM");
    }
}

const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await clientModel.delete({  _id: id });
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };