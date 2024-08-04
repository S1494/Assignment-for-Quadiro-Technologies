const carsSchema = require("../model/carsSchema");

exports.productGet = async (req, res) => {
  const data = await carsSchema.find();

  return res.status(200).json({
    success: true,
    length: data.length,
    data,
  });
};

exports.productPost = async (req, res) => {
  const { carName, mfgYear, price } = req.body;

  try {
    if (!carName || !mfgYear || !price) {
      return res.status(400).send("All Fields Are Mandatory");
    }

    const nCar = await new carsSchema({
      carName,
      mfgYear,
      price,
    });

    nCar.save();
    return res.status(200).send("Data Saved");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

exports.productDelete = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id not found",
      });
    }
    const status = await carsSchema.findByIdAndDelete(id);
    console.log(status);

    return res.status(200).json({
      success: true,
      message: "product deleted",
    });
  } catch (error) {}
};

exports.productPut = async (req, res) => {
  const { carName, mfgYear, price } = req.body;
  const id = req.params.id;

  try {
    if (!carName || !mfgYear || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id not found",
      });
    }

    await carsSchema.findByIdAndUpdate(id, {
      carName,
      mfgYear,
      price,
    });

    return res.status(400).json({
      success: true,
      message: "product Updated",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
