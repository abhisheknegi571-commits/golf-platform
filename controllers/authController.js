import User from "../models/User.js";

import bcrypt from "bcryptjs";

//signup user
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.redirect("/login");
  } catch (error) {
    console.log(error);

    res.send("Error");
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Wrong password");
    }

    req.session.userId = user._id;

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);

    res.send("Login error");
  }
};

//logout user
export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
