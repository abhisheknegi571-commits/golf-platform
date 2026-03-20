import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
    },

    subscriptionStatus: {
      type: String,
      default: "inactive",
    },

    charity: {
      type: String,
      default: "None",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
