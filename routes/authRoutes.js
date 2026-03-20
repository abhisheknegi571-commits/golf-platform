import express from "express";

import { signupUser, loginUser, logoutUser } from "../controllers/authController.js";

const router = express.Router();

//get signup route
router.get("/signup", (req, res) => {
  res.render("signup");
});

//post signup route
router.post("/signup", signupUser);

//get login route
router.get("/login", (req, res) => {
  res.render("login");
});

//post login route
router.post("/login", loginUser);

//logout route
router.get("/logout",logoutUser);

export default router;
