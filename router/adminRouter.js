const adminRouter = require("express").Router();
const productcont = require("../controller/productController");
const adminAuthCheck = require("../middleware/adminAuthCheck");
const userAuthCheck = require("../middleware/userAuthCheck");

adminRouter.get("/products", userAuthCheck, productcont.productGet);
adminRouter.post(
  "/products/",
  userAuthCheck,
  adminAuthCheck,
  productcont.productPost
);
adminRouter.delete(
  "/products/:id",
  userAuthCheck,
  adminAuthCheck,
  productcont.productDelete
);
adminRouter.put(
  "/products/:id",
  userAuthCheck,
  adminAuthCheck,
  productcont.productPut
);

module.exports = adminRouter;
