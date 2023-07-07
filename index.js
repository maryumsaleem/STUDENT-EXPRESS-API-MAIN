const express = require("express");
const app = express();
const routes = require('./routes/routes');
const dotenv = require("dotenv");
require("./db");
const expressSanitize = require("express-mongo-sanitize");


//load env vars
dotenv.config({ path: "./config/config.env" });

/************** Middlewares ****************/
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(expressSanitize());



app.use('/',routes);

app.get("/", (req, res) => {
  res.send("Welcome");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
