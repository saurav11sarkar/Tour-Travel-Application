import config from "../../config";
import sendMail from "../../utils/sendMail";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { ILogin } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new Error("User not found");
  }
  if (user.status === "inactive") {
    throw new Error("User is not active");
  }

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) {
    throw new Error("Password does not match");
  }

  const { role, email } = user;
  const jwtPayload = {  role, email };
  const token = jwt.sign(jwtPayload, config.secrit as string, {
    expiresIn: "10d",
  });

  const { password, ...result } = user.toObject();
  return { token, result };
};

const forgetPassword = async (payload: { email: string }) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) throw new Error("User is not found");
  if (user.status === "inactive") throw new Error("User is blacked");

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(jwtPayload, config.secrit as string, {
    expiresIn: "5h",
  });

  const resetLink = `http://localhost:5173/forget-password?id=${user._id}&token=${token}`;
  // console.log(resetLink);

  await sendMail(user.email, "Reset password", resetLink);
};

const resetPassword = async (payload: {
  id: string;
  token: string;
  password: string;
}) => {
  const user = await User.findById(payload.id).select("+password");
  if (!user) throw new Error("User not found");
  if (user.status === "inactive") throw new Error("User is inactive");

  try {
    jwt.verify(payload.token, config.secrit as string);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(payload.password, Number(config.round));
  user.password = hashedPassword;
  const result = await User.findByIdAndUpdate(user.id,user,{new:true})
  return result;
};

export const authService = {
  register,
  login,
  forgetPassword,
  resetPassword,
};

