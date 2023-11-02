const mongoose = require('mongoose');

const dbConnect = () => {
    const DB_URI = process.env.MONGODB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((res) => {
        console.log('Database Succesfully Connected')
    }).catch((error) => {
        console.log(error);
    })
}

module.exports = dbConnect;