//import { v2 as cloudinary } from "cloudinary";
var cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

//multiple
async function uploadImages(file, folder) {
  return await cloudinary.uploader.upload(file, {
    folder: folder,
  });
  // return new Promise(resolve => {
  //   cloudinary.uploader.upload(file, (result) => {
  //     resolve({
  //       url: result.url,
  //       id: result.public_id
  //     },{
  //       resource_type: "auto",
  //       folder: folder
  //     })
  //   })
  // })
}

async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: "replit",
  });
}

async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}

module.exports = { uploadImage, deleteImage, uploadImages }

