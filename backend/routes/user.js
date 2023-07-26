const express = require("express");
const router = express.Router();

const { loginUser, signupUser } = require("../controllers/userController");

//login route
router.post("/api/login", loginUser);

//signup route
router.post("/api/signup", signupUser);

module.exports = router;
