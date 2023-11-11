const { matchedData } = require("express-validator");
const { clientModel } = require("../models");
const { handleHttpError } = require("../utils/handleHttpError");
const { encrypt } = require("../utils/handlePasswordClient");
const { tokenSign } = require("../utils/handleJWT");
const { compare } = require("bcryptjs");
const { sendConfirmationEmail } = require("../nodeMailer/email");

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

const getItemEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const data = await clientModel.findOne({email: email}); // finById para buscar con id
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};


const createItem = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataClient = await clientModel.create(body);
    dataClient.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataClient),
      user: dataClient,
    };
    
    console.log("token de user creado: ", body.email, data.token)

    const confirmationLink = `http://localhost:3000/client/dashboard/content-manager/${data.token}`
    sendConfirmationEmail(body.email, confirmationLink)

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
};

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await clientModel.delete({ _id: id });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

const loginItem = async (req, res) => {
  try {
    req = matchedData(req);
    console.log(req);
    const user = await clientModel
      .findOne({ email: req.email })
      .select("password name role email");
    console.log(user);
    if (!user) {
      handleHttpError(res, "ERROR_USER_NOT_EXISTS", 404);
      return;
    }

    const hashPassword = user.get("password");
    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = {
  getItems,
  getItem,
  getItemEmail,
  createItem,
  updateItem,
  deleteItem,
  loginItem,
};
