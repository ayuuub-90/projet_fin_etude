import jwt from "jsonwebtoken";

const generateToken = (res, userID) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.JWT_ACCESS !== "developement",
    sameSite: "strict",
    maxAge: 30 * 24 * 3600 * 1000,
  });

  return token;
};

export default generateToken;
