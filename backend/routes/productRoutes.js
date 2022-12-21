const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");

router.route("/all").get(productController.getAllProducts);
router
  .route("/admin/products")
  .get(
    isAuthenticatedUser,
    isAuthorizedRole("admin"),
    productController.getAdminProducts
  );
router
  .route("/new")
  .post(
    isAuthenticatedUser,
    isAuthorizedRole("admin"),
    productController.createProduct
  );
router.route("/:id").get(productController.getProductDetails);
module.exports = router;
