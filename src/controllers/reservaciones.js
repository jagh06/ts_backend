const http = require("http");
const { reservacionesModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleHttpError");

const getItems = async (req, res) => {
  try {
    const data = await reservacionesModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try {
    const { iduser } = req.params;
    const data = await reservacionesModel.find({ iduser: iduser });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const getItemEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const data = await reservacionesModel.findOne({ email: email }); // finById para buscar con id
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const {
      emailowner,
      namehotel,
      city,
      street,
      idhotel,
      iduser,
      name,
      email,
      phone,
      numpersonas,
      fechallegada,
      numdenoches
    } = req.body;
    const newDatas = await reservacionesModel({
      emailowner,
      namehotel,
      city,
      street,
      idhotel,
      iduser,
      name,
      email,
      phone,
      numpersonas,
      fechallegada,
      numdenoches,
    });
    newDatas.save();
    res.send({ newDatas });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const data = await reservacionesModel.findByIdAndDelete({ _id: id });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = {
  getItems,
  getItem,
  getItemEmail,
  createItem,
  deleteItem,
};
