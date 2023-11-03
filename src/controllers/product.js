const { productModel } = require("../models");
const fs = require("fs-extra");
const { uploadImages } = require("../config/cloudinary");
const { handleHttpError } = require("../utils/handleHttpError");

const createItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const uploader = async (path) => await uploadImages(path, "hotelImages");
    try {
      if (req.method === "POST") {
        const urls = [];
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          const { secure_url, public_id  } = await uploader(path);
          urls.push({ public_id, secure_url});
          fs.unlinkSync(path);
        }
  
        const product = await new productModel({
          name: name,
          description: description,
          price: price,
          images: urls,
        });
  
        product.save();
        return res.status(200).json({
          success: true,
          message: "product created sucessfully",
          data: product,
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
    handleHttpError(res, "ERROR_ADD_PRODUCT")
  }

 
};


module.exports = { createItem };

// const createItem = async (req, res) => {
//   const { name, description, price } = req.body;

//   const uploader = async (path) => await cloudinary.uploads(path, "hotelImages");
//   try {
//     if (req.method === "POST") {
//       const urls = [];
//       const files = req.files;
//       for (const file of files) {
//         const { path } = file;
//         const newPath = await uploader(path);
//         urls.push(newPath);
//         fs.unlinkSync(path);
//       }

//       const product = await new productModel({
//         name: name,
//         description: description,
//         price: price,
//         files: urls,
//       });

//       console.log(product)

//       product.save();
//       return res.status(200).json({
//         success: true,
//         message: "product created sucessfully",
//         data: product,
//       });
//     } else {
//       return res.status(405).json({
//         err: `${req.method} method not allowed`,
//       });
//     }
//   } catch (error) {
//     return res.status(412).send({
//       success: false,
//       message: error.message,
//     });
//   }
// };
