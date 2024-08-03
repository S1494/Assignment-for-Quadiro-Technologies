const mongoose = require("mongoose");

const mongoConnect = () =>
  mongoose.connect(process.env.DB).then(() => {
    console.log("mongo Connected");
  });

module.exports = mongoConnect;
