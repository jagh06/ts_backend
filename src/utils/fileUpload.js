const fileUpload = require("express-fileupload");


// para una imagen
const imageUpload = fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads",
});



module.exports = imageUpload;
