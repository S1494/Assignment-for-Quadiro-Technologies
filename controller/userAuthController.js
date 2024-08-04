const userAuthSchema = require("../model/userAuthSchema");
const bcrypt = require("bcryptjs");

exports.loginGet = (req, res) => {
  res.send("this is loginpage");
};
exports.signupGet = (req, res) => {
  res.send("this is signup pag");
};

exports.loginPost = async (req, res) => {
  if (req.session.isAuth) {
    return res.status(200).json({
      success: true,
      purpose: "Assignment for Quadiro Technologies",
      message: "User is already logged in",
    });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      purpose: "Assignment for Quadiro Technologies",
      message: "Email & Password is required",
    });
  }

  try {
    const isExist = await userAuthSchema.findOne({ email });

    if (!isExist) {
      return res.status(400).json({
        success: false,
        purpose: "Assignment for Quadiro Technologies",
        message: "Username and password is invalid",
      });
    }

    const encpass = await bcrypt.compare(password, isExist.password);

    if (!encpass) {
      return res.status(400).json({
        success: false,
        purpose: "Assignment for Quadiro Technologies",
        message: "Username and password is invalid",
      });
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
    return res.status(500).json({
      purpose: "Assignment for Quadiro Technologies",
      message: error.message,
    });
  }
};

exports.signupPost = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        purpose: "Assignment for Quadiro Technologies",
        messagel: "All Fields Are Mandatory",
      });
    }

    if (name.length < 3) {
      return res.status(400).json({
        success: false,
        purpose: "Assignment for Quadiro Technologies",
        messagel: "Name  is too short",
      });
    }

    if (!email.includes("@") || !email.includes(".com") || email.length < 9) {
      return res.status(400).json({
        success: false,
        purpose: "Assignment for Quadiro Technologies",
        messagel: "Enter an valid email address",
      });
    }

    if (password.length <= 7) {
      return res.status(400).json({
        success: false,
        purpose: "Assignment for Quadiro Technologies",
        messagel: "Password is too short",
      });
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

    return res.status(200).json({
      success: true,
      purpose: "Assignment for Quadiro Technologies",
      messagel: "user registered",
    });
  } catch (error) {
    res.send(error);
  }
};

exports.logout = async (req, res) => {
  console.log("k");

  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to Logged out",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
};
