const express = require("express");

const route = express.Router();

const { loginUser, SignupUser } = require("../controller/userController");

//login
route.post("/login", loginUser);

//signup
route.post("/signup", SignupUser);

module.exports = route;
