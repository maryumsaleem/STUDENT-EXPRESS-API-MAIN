const express = require("express");
const router = express.Router();
const path = require("path");
const dotenv = require("dotenv");
//load env vars
dotenv.config({ path: "./config/config.env" });

//-- *********** Import Controller Functions *********** --//
const authController = require("../controllers/authController");
const studentController = require("../controllers/studentController");
const { Protect } = require("../utils/Protect");
const { RestrictTo } = require("../utils/Restrict");

router.post("/login", authController.Login);
router.post("/signup", authController.Signup);

//! *** Student Routes ***!//
router
  .route("/student")
  .get(studentController.getStudent)
  .post(studentController.addStudent);
router
  .route("/student/:id")
  .get(studentController.singleStudent)
  .patch(
    Protect,
    RestrictTo('admin','user'),
    studentController.updateStudent
  )
  .delete(
    Protect,
    RestrictTo('admin','user'),
    studentController.removeStudent
  );

module.exports = router;
