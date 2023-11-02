const express = require('express');
require('dotenv').config();
const cors = require('cors')
const dbConnect = require('./config/mongodb')
const app = express();

app.use(cors())
app.use(express.json());



app.get('/', (req, res) => {
    res.send("welcome");
})

app.use('/api', require('./routes'))

const port = process.env.PORT || 3001;

app.listen(port, ()=> console.log(`Listening app at http://localhost:${port}`));
dbConnect();