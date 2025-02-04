const express = require("express");
const { registerUser, loginUser, updateUser, getUser, resetPassword, checkIsGoogleLogin } = require("../controller/userController");
const userRouter = express.Router();
const Authorization = require("../middleware/auth");
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/auth/google").post(checkIsGoogleLogin);
// userRouter.route("/update-me").put(Authorization, updateUser);
userRouter.route("/me").get(Authorization, getUser);
// userRouter.route("/reset-password").post(Authorization, resetPassword);
module.exports = userRouter;