import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRoutes from "./routes/authRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import User from "./models/User.js";
import Score from "./models/Score.js";
import { isLoggedIn } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  }),
);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(authRoutes);

//home route
app.get("/", (req, res) => {
  res.render("home");
});

//admin route
app.get("/admin",isLoggedIn, async (req, res) => {
  const users = await User.find();

  const scores = await Score.find().populate("userId");

  res.render("admin", { users, scores });
});

//admin delete
app.get("/admin/delete/:id",isLoggedIn, async (req, res) => {
  await Score.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});

//score routes
app.use(scoreRoutes);

//mongodb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => {
    console.log(err);
  });

//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started");
});
