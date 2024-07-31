const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const SALT = require("../constants/constants");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  lastName: {
    type: String,
    required: [true, "LastName is Required"],
  },
  password: {
    type: String,
    required: false,
  },
  profilePicture:{
    type: String
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
  return token;
};



userSchema.methods.comparePassword = async function (enteredPassword) {
  const checkHash = crypto
    .pbkdf2Sync(enteredPassword, SALT, 10000, 64, "sha512")
    .toString("hex");
  return this.password === checkHash;
};

module.exports = mongoose.model("User", userSchema);
