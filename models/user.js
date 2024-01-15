import mongoose from "mongoose";
const data_structure = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  profile: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export const user = mongoose.model("Users", data_structure);
