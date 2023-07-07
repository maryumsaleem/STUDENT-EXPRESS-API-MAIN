const Student = require("../models/Student");
const ApiFeatures = require("../utils/apiFeatures")
const {studentStatuses, success, fail} = require("../utils/Constants")

module.exports = {
  /*** Add Student to Database ***/
  addStudent: async (req, res) => {
    try {
      const { name, email, rollno } = req.body;
      let data = { name, email, rollno };
      const student = await Student.create(data);
      res.status(201).json({ status: `${fail}`, data: { student } });
    } catch (error) {
      res.status(400).json({ status: `${fail}`, message: error.message });
    }
  },

  /*** Get Student  from Database ***/
  getStudent: async (req, res) => {
    try {
     // Create a new instance of ApiFeatures with the query and queryString parameters
     const features = new ApiFeatures(Student.find(), req.query);

     // Apply the necessary methods for filtering, pagination, sorting, and limiting fields
     const filteredFeatures = features.filter().Paginate().sort().LimitFields();

     // Execute the modified query
     const students = await filteredFeatures.query;

      res.status(200).json({
        status: `${success}`,
        results: students.length,
        data: {
          students,
        },
      });
    } catch (err) {
      res.status(401).json({ status: `${fail}`, message: err.message });
    }
  },

  /*** get a student  ***/
  singleStudent: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      res.status(200).json({
        status: `${success}`,
        data: {
          student,
        },
      });
    } catch (err) {
      res.status(401).json({ status: `${fail}`, message: err.message });
    }
  },

  /*** update a student  ***/
  updateStudent: async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    let record = await Student.findById(id);
    if(!record) {
      return  res.status(404).json({
        status: `${fail}`,
        message:`${studentStatuses.invalidId}`,
      });
    }
    const student = await Student.findByIdAndUpdate(id, data, { new: true }).select("-__v");
    try {
      res.status(200).json({
        status: `${success}`,
        data: student,
      });
    } catch (err) {
      res.status(400).json({
        status: `${fail}`,
        message: err.message,
      });
    }
  },


  removeStudent: async (req, res) => {
    const id = req.params.id;
    let record = await Student.findById(id);
    console.log(record);
    if(!record) {
      return  res.status(404).json({
        status: `${fail}`,
        message: `${studentStatuses.invalidId}`,
      });
    }
    const student = await Student.findByIdAndDelete(id);
    try {
      res.status(200).json({
        status: `${success}`,
        data: null,
      });
    } catch (err) {
      res.status(400).json({
        status: `${fail}`,
        message: err.message,
      });
    }
  },
};
