const { matchedData } = require("express-validator");
const { clientModel, keysModel } = require("../models");
const { handleHttpError } = require("../utils/handleHttpError");
const { encrypt } = require("../utils/handlePasswordClient");
const { tokenSign, tokenSignForgotPassword, verifyToken } = require("../utils/handleJWT");
const { compare } = require("bcryptjs");
const {
  sendConfirmationEmail,
  sendRecoverPassword,
} = require("../nodeMailer/email");

const http = require("http");
const { default: axios } = require("axios");

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
    const data = await clientModel.findOne({ email: email }); // finById para buscar con id
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
    const tokenClient = data.token;

    // secret keymasterjagh06

    const emailLink = `http://localhost:3000/client/verify`;
    sendConfirmationEmail(body.email, emailLink, tokenClient);

    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");

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
      .select("password name role lastname email");
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

const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const data = {
      token: await tokenSignForgotPassword(email)
    };
    sendRecoverPassword(email, data.token);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const verifyTokenJWTRecoverPassword = async (req, res) => {
  try {
    const { token } = req.body;
    console.log("token enviado::", token)
    const verify = await verifyToken(token)
    console.log("respuesta de token: ", verify)
    res.send({ verify });
  } catch (error) {
    handleHttpError(res, "ERROR_VERYFY_TOKEN_JWT")
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
  recoverPassword,
  verifyTokenJWTRecoverPassword
};
