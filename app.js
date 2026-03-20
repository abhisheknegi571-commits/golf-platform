import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRoutes from "./routes/authRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
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
  res.send("Server running");
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
