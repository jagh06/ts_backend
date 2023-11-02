const { productModel } = require("../models");
const fs = require("fs-extra");
const { uploadImages } = require("../config/cloudinary");

const createItem = async (req, res) => {
  // try {
  //   const {
  //     name,
  //     description,
  //     price,
  //   } = req.body;

  //   const data = new productModel({
  //     name,
  //     description,
  //     price,
  //   });

  //   console.log(req.files?.images)

  //   if(req.files?.images) {
  //     const result = await uploadImages(req.files.images.tempFilePath);
  //     data.images = [{
  //       original_filename: result.original_filename,
  //       public_id: result.public_id,
  //       secure_url: result.secure_url,
  //       }
  //     ];

  //     await fs.unlink(req.files.images.tempFilePath);
  //   }
  //   await data.save();
  //   res.json(data);
  // } catch (error) {
  //   handleHttpError(res, "ERROR_CREATE_ITEM");
  // }



  const { name, description, price } = req.body;

  const uploader = async (path) => await uploadImages(path, "hotelImages");
  try {
    if (req.method === "POST") {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      
      const product = await new productModel({
        name: name,
        description: description,
        price: price,
        images: urls,
      });

      console.log(product)

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
};


module.exports = {  createItem  }



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