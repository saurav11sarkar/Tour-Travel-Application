import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);
  sendResponse(res, 201, "Register is successfully", result);
});
const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  sendResponse(res, 200, "Login is successfully", result);
});

const forgetPassword = catchAsync(async(req ,res)=>{
  const result = await authService.forgetPassword(req.body);
  sendResponse(res, 200, "Forget password is successfully", null);
})

const resetPassword = catchAsync(async(req ,res)=>{
  const result = await authService.resetPassword(req.body);
  sendResponse(res, 200, "Reset password is successfully", null);
})

export const authController = {
  register,
  login,
  forgetPassword,
  resetPassword
};
