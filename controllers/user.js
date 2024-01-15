import { user } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utilis/features.js";
import ErrorHandler from "../middlewares/err.js";

export const register = async (req, res, next) => {
  const { name, email, password, profile } = req.body;
  if (!profile) return next(new ErrorHandler("Select a profile picture", 400));
  const hashedpassword = bcrypt.hashSync(password, 10);
  const data = await user.findOne({ email });
  if (data) return next(new ErrorHandler("User already exist", 400));
  await user
    .create({ name, email, password: hashedpassword, profile })
    .then((data) => {
      return sendCookie(res, data, `Registered Sucessfully`);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const data = await user.findOne({ email }).select("+password");
  if (!data) return next(new ErrorHandler("Invalid email or password", 401));
  if (bcrypt.compareSync(password, data.password)) {
    return sendCookie(res, data, `Welcome back ` + data.name);
  } else return next(new ErrorHandler("Invalid email or password", 401));
};

export const getUser = async (req, res) => {
  const user_data = await user.findById({ _id: req.data._id });
  res.json({
    success: "true",
    message: "Welcome back " + req.data.name,
    user_data,
  });
};

export const changeProfileName = async (req, res, next) => {
  const { changename } = req.body;
  if (changename == "") return next(new ErrorHandler("Name is Blank", 400));
  await user.updateOne(
    { email: req.data.email },
    { $set: { name: changename } }
  );
  res.json({
    sucess: "true",
    message: "Username Changed Sucessfully",
  });
};

export const changeProfileImage = async (req, res, next) => {
  const { changeprofile } = req.body;
  if (!changeprofile) return next(new ErrorHandler("Select an Image", 400));
  await user.updateOne(
    { email: req.data.email },
    { $set: { profile: changeprofile } }
  );
  res.json({
    success: "true",
    message: "Profile Changed Sucessfully",
  });
};

export const changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const data = await user
    .findOne({ email: req.data.email })
    .select("+password");
  if (bcrypt.compareSync(currentPassword, data.password)) {
    const hashedpassword = bcrypt.hashSync(newPassword, 10);
    await user.updateOne(
      { email: req.data.email },
      { $set: { password: hashedpassword } }
    );
    res.json({
      success: "true",
      message: "Password Changed Sucessfully",
    });
  } else return next(new ErrorHandler("Incorrect Current Password", 400));
};

export const logout = (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    })
    .json({
      success: "true",
      message: "Logged Out Sucessfully",
    });
};
