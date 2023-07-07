const User = require("../models/User");
const dotenv = require("dotenv");
const {authMessages, success, fail} = require("../utils/Constants")

//load env vars
dotenv.config({ path: "./config/config.env" });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let login_token = "user-json-login-token"; 

/*** Signup  function for new User***/
exports.Signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let newUser = await new User({ name, email, password });
    newUser = await newUser.save();
    let token = jwt.sign({ id: newUser._id }, login_token);
    res.status(200).json({
      status: `${success}`,
      data: {
        user: newUser,
        token
      },
    });
  }catch (err) {
    err.name ==="MongoServerError" && err.code === 11000 
    ? res.status(400).json({status: `${fail}`, message:`${authMessages.duplicateUser}`})
    : res.status(400).json({status: `${fail}`,message:err.message});
  }
};
/*** Login  function for existing User***/

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(400).json({
        status: `${fail}`,
        message: `${authMessages.requiredEmail}`,
      });
    }
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        status: `${fail}`,
        message: `${authMessages.requiredUser}`,
      });
    }
    console.log(user);
    let comp = await bcrypt.compare(req.body.password, user.password);
    if (!comp) {
      return res
        .status(401)
        .json({status: `${fail}`, message: `${authMessages.validEmail}`});
    }
    let token = jwt.sign({ id: user._id }, login_token);
    console.log(token);

    res.status(200).json({
      status: `${success}`,
      token,
      message: `${authMessages.loggedIn}`,
    });
  } catch (err) {
    res.status(400).json({
      status: `${fail}`,
      message: err.message,
    });
  }
};
