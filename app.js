const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send("Welcome")
})


const port = 3001;
app.listen(port, ()=> {
    console.log(`Listening app at http://localhost:${port}`)
})