//import dotenv library
require("dotenv").config();

//import express
const express = require("express");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./routes/user");

//express app variable
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/user", userRoutes);

//db connection
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    //listener
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & listening on", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
