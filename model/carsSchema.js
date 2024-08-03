const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
  carName: {
    type: String,
    required: true,
  },
  mfgYear: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("carsSchema", carsSchema);
