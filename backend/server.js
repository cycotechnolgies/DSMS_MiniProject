//import dotenv library
require("dotenv").config();

//import express
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/events");
const payRoutes = require("./routes/pay");
const mediRoutes = require("./routes/medical");
const renewRoute = require("./routes/renewal");
const classRoute = require("./routes/class");
const path = require("path");

//express app variable
const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


//routes
app.use("/api/events", eventRoutes);
app.use("/api/user", userRoutes);
app.use("/api/pay", payRoutes);
app.use("/api/medi", mediRoutes);
app.use("/api/renewal", renewRoute);
app.use("/api/class", classRoute);
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/slips", express.static(path.join(__dirname, "public/slips")));

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
