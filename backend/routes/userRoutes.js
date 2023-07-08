const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/").get(authController.getAllUsers);
router
  .route("/:id")
  .get(authController.getUser)
  .patch(authController.updateUser)
  .delete(authController.deleteUser);
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.delete(
  "delUser",
  authMiddleware.protect,
  authMiddleware.permissionTo("admin", "user"),
  authController.deleteUser
);
router.get("/login/failed", (req, res) => {
  return res.status(401).json({
    status: "fail",
    message: "Failed login with google",
  });
});
router.get("/medgrizz/api/v1/users", authController.signInWithGoogle);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect:
      "http://localhost:4000/medgrizz/api/v1/users/medgrizz/api/v1/users",
    failureRedirect: "/login/failed",
  })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logout();
  return res.redirect("http://localhost:3000/");
});

module.exports = router;
