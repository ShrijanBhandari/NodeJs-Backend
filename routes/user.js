import express from "express";
import {
  changePassword,
  changeProfileImage,
  changeProfileName,
  getUser,
  login,
  logout,
  register,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/mydata", isAuthenticated, getUser);
router.put("/updateName", isAuthenticated, changeProfileName);
router.put("/updateProfile", isAuthenticated, changeProfileImage);
router.put("/updatePassword", isAuthenticated, changePassword);

export default router;
