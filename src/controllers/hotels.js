const { matchedData } = require("express-validator");
const { hotelModel } = require("../models");
const { handleHttpError } = require("../utils/handleHttpError");
const { uploadImages, deleteImage } = require("../config/cloudinary");
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

const getItemEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const data = await hotelModel.find({ emailowner: email });
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

    const uploader = async (path) => await uploadImages(path, "hotelImages");
    try {
      if (req.method === "POST") {
        const urls = [];
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          const { secure_url, public_id } = await uploader(path);
          urls.push({ public_id, secure_url });
          fs.unlinkSync(path);
        }

        const newHotel = await new hotelModel({
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
          images: urls,
        });

        newHotel.save();
        return res.status(200).json({
          success: true,
          message: "product created sucessfully",
          data: newHotel,
        });
      } else {
        return res.status(405).json({
          err: `${req.method} method not allowed`,
        });
      }
    } catch (error) {
      return res.status(412).send({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

const updateItem = async (req, res) => {
  try {
    console.log(req.params.id)
    console.log(req.body)
    const data = await hotelModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};

const deleteItem = async (req, res) => {
  try {
    const data = await hotelModel.findByIdAndDelete(req.params.id);

    for (const file of data.images) {
      const { public_id } = file;
      if (public_id) {
        await deletesImage(public_id);
      }
    }

    res.json(data);
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getItemEmail,
};

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
