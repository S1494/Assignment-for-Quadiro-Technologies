const userAuthCheck = (req, res, next) => {
  console.log(req.session.isAuth, req.session.isAdmin, req.session.uId);
  if (req.session.isAuth) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "User not logged in",
    });
  }
};

module.exports = userAuthCheck;
