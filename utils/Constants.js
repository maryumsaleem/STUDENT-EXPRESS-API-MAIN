let success = "success";
let fail = "failed";
// Authorization Status
let authMessages = {
  duplicateUser: "User already exists!",
  requiredEmail: "Email and Password are required!",
  requiredUser: "No user found with email address!",
  validEmail: "Email or Password is incorrect!",
  loggedIn: "You are Successfully Signed in!",
};
//Protect Statuses
let protectMessages = {
  userFind: "User not found",
  login: "You are not Logged In",
};
// Student Statuses
let studentStatuses = {
  page: "This page does not exist",
  invalidId: "Record not found with provided id",
};

// Restrict Statuses
let restrictedStatuses = {
  unauthorized: "You are not authorized",
};

module.exports = {
  authMessages,
  protectMessages,
  studentStatuses,
  restrictedStatuses,
  success,
  fail,
};
