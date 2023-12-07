const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./config/mongodb");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const whiteList = [
  `https://turingoclient.vercel.app`,
  `https://turingospace.vercel.app`,
  `http://localhost:3000`,
  `http://localhost:3001`,
];

app.use(cors({ origin: whiteList, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api", require("./routes"));

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Listening app at http://localhost:${port}`)
);
dbConnect();
