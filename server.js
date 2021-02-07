//require in express, mongoose, morgan, and path
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

//port 3000 or Heroku port
const PORT = process.env.PORT || 3000;

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger("dev"));

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// routes
require("./routes/apiWorkout.js")(app);

//route to index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

//route to stats.html
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

//route to exercise.html
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

//port listener
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
