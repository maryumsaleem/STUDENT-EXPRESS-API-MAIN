const mongoose = require("mongoose");
let StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim:true,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique:true,
    trim:true,
    lowercase:true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email address",
    },
  },
  rollno:{
    type: Number,
    required:[true,"Rollno is Required!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  
});
 
const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;