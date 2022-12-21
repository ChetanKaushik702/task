const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");

router.route("/register").post(userController.addUser);
router.route("/login").post(userController.loginUser);
router.route("/logout").put(userController.logoutUser);
router
  .route("/password/update")
  .put(isAuthenticatedUser, userController.updatePassword);
router.route("/me").get(isAuthenticatedUser, userController.getUserDetails);
router
  .route("/admin/users")
  .get(
    isAuthenticatedUser,
    isAuthorizedRole("admin"),
    userController.getAllUsers
  );
module.exports = router;
