const fileUpload = require('express-fileupload')

const imageUpload =  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  });

module.exports =  imageUpload;
