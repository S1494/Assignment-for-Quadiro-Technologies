const userAuthSchema = require("../model/userAuthSchema");
const bcrypt = require("bcryptjs");

exports.loginGet = (req, res) => {
  res.send("this is loginpage");
};
exports.signupGet = (req, res) => {
  res.send("this is signup pag");
};

exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isExist = await userAuthSchema.findOne({ email });

    if (!isExist) {
      return res.status(400).send("Username and password is invalid");
    }

    const encpass = await bcrypt.compare(password, isExist.password);

    if (!encpass) {
      return res.status(400).send("Username and password is invalid");
    }

    req.session.isAuth = true;
    req.session.uId = isExist.id;
    req.session.isAdmin = isExist.isAdmin;

    if (isExist.isAdmin) {
      return res.status(200).json({
        purpose: "Assignment for Quadiro Technologies",
        message: "user validated as Admin",
      });
      // send this user to admin dashboard
    }
    return res.status(200).json({
      purpose: "Assignment for Quadiro Technologies",
      message: "user validated",
    });
    // send this user to user dashboard
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.signupPost = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).send("All Fields Are Mandatory");
    }

    if (name.length < 3) {
      return res.status(400).send("Name  is too short");
    }
    if (!email.includes("@") || !email.includes(".com") || email.length < 9) {
      return res.status(400).send("Enter an valid email address");
    }

    if (password.length <= 7) {
      return res.status(400).send("Password is too short");
    }

    const encPassword = await bcrypt.hash(password, 15);

    console.log(encPassword, password);

    const nUser = await userAuthSchema({
      name,
      email,
      password: encPassword,
    });

    req.session.isAuth = true;
    req.session.uId = nUser.id;
    req.session.isAdmin = false;

    nUser.save();

    return res.status(200).send("user registered");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};
