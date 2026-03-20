import express from "express";

import { addScore, getDashboard, deleteScore } from "../controllers/scoreController.js";

import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

//add score route
router.post("/add-score", isLoggedIn, addScore);

//get dashboard route
router.get("/dashboard",isLoggedIn,getDashboard);

//delete score route
router.get("/delete-score/:id",isLoggedIn,deleteScore);

export default router;
