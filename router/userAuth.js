const userAuth = require("express").Router();
const userAuthContr = require("../controller/userAuthController");

userAuth.get("/signup", userAuthContr.signupGet);
userAuth.post("/signup", userAuthContr.signupPost);

userAuth.get("/login", userAuthContr.loginGet);
userAuth.post("/login", userAuthContr.loginPost);
userAuth.post("/logout", userAuthContr.logout);

module.exports = userAuth;
