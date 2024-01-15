import jwt from "jsonwebtoken";
export const sendCookie = (res, data, message) => {
  const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET);
  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 500000,
      sameSite: "none",
      secure: true,
      // sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      // secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: "true",
      message,
    });
};
