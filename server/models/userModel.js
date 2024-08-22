import mongoose from "mongoose";
import { UserRole } from "../config/role_list.js";

const userSchema = new mongoose.Schema({
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
  roles: {
    type: [Number],
    enum: Object.values(UserRole).map((role) => role.valueOf()),
    default: [UserRole.USER.valueOf()],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const userModel = mongoose.model("User", userSchema);
