const adminAuthCheck = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "User is not Admin",
    });
  }
};

module.exports = adminAuthCheck;
