const { matchedData } = require("express-validator");
const { hotelModel } = require("../models");
const { handleHttpError } = require("../utils/handleHttpError");
const { uploadImage, deleteImage } = require("../config/cloudinary");
const fs = require("fs-extra");

const getItems = async (req, res) => {
  try {
    const data = await hotelModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await hotelModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const {
      nameowner,
      lastnameowner,
      emailowner,
      namehotel,
      description,
      price,
      postalcode,
      street,
      streetnumber,
      city,
      phone,
    } = req.body;
    
    const data = new hotelModel({
      nameowner,
      lastnameowner,
      emailowner,
      namehotel,
      description,
      price,
      postalcode,
      street,
      streetnumber,
      city,
      phone,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      data.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(req.files.image.tempFilePath);
    }
    await data.save();

    res.json(data);
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

const updateItem = async (req, res) => {
  try {
    const data = await hotelModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};

const deleteItem = async (req, res) => {
  try {
    const data = await hotelModel.findByIdAndDelete(req.params.id);

    if (data.image?.public_id) {
      await deleteImage(data.image.public_id);
    }

    res.json(data);
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };

// const createItem = async (req, res) => {
//   try {
//     const body = matchedData(req);
//     const data = await hotelModel.create(body);
//     res.send({ data });
//   } catch (error) {
//     handleHttpError(res, "ERROR_CREATE_ITEM");
//   }
// };

// const deleteItem = async (req, res) => {
//   try {
//     req = matchedData(req);
//     const { id } = req;
//     const data = await hotelModel.delete({ _id: id });
//     res.send({ data });
//   } catch (error) {
//     handleHttpError(res, "ERROR_DELETE_ITEM");
//   }
// };
