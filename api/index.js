const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passportConfig = require("./config/passport-config");
const session = require("express-session");
require("dotenv").config();
const app = express();
const passport = require("passport");
const router = require("./router/index.js");
const errorMiddleware = require("./middlewares/errorMiddleware.js");

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: process.env.API_URL,
  })
);
app.use(
  session({
    secret: "hahaha",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

const start = () => {
  try {
    app.listen(PORT, () => console.log("server start on port " + PORT));
  } catch (err) {
    console.log(err);
  }
};

start();
