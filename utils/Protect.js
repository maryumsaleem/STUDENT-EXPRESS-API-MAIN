const User = require("../models/User");
const dotenv = require("dotenv");
//load env vars
dotenv.config({ path: "./config/config.env" }); 
const jwt = require("jsonwebtoken");
let login_token = "user-json-login-token";
const util = require("util");
const {protectMessages, success, fail} = require("../utils/Constants")
/*** Login  function for existing User***/

exports.Protect = async (req, res, next) => {
    try {
      let token = req.headers["authorization"];
      if (token && token.startsWith("Bearer")) {
        token = token.split(" ")[1];
        let decoded = await util.promisify(jwt.verify)(token, login_token);
        let freshUser = await User.findById(decoded.id);
        //console.log(freshUser);
        if (!freshUser) {
          res
            .status(401)
            .json({
              status: `${fail}`,
              message: `${protectMessages.userFind}`,
            });
        }
        req.user = freshUser;
        next();
        // Check whether user has changed password after token issued
      } else {
        res
          .status(403)
          .json({
            status: `${fail}`,
            message: `${protectMessages.login}`,
          });
      }
    } catch (err) {
      res.status(400).json({
        status: `${fail}`,
        message: err.message,
      });
    }
  };
  