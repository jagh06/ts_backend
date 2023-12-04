const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./config/mongodb");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const whiteList = [
  `https://turingoclient.vercel.app`,
  `${process.env.PORT_FINAL_USER}`,
  `${process.env.PORT_USER}`,
];

app.use(cors({ origin: whiteList, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
Ñ
app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api", require("./routes"));

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Listening app at http://localhost:${port}`)
);
dbConnect();
