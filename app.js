const express = require("express");
const app = express();
const userAuth = require("./router/userAuth");
const adminRouter = require("./router/adminRouter");
const session = require("express-session");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "shubham",
    saveUninitialized: false,
    resave: false,
  })
);

app.use("/auth", userAuth);
app.use("/admin", adminRouter);
app.set("view engine", "ejs");

module.exports = app;
