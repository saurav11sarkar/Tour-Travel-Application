import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, 201, "User create successfully", result);
});

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser();
  sendResponse(res, 200, "User retrive successfully", result);
});

const singleUser = catchAsync(async (req, res) => {
  const result = await userService.singleUser(req.params.id);
  sendResponse(res, 200, "Single user is retrive successfully", result);
});

const updateUser = catchAsync(async (req, res) => {
  const result = await userService.updateUser(req.params.id, req.body);
  sendResponse(res, 203, "User is updated successfully", result);
});
const deletedUser = catchAsync(async (req, res) => {
  const result = await userService.deletedUser(req.params.id);
  sendResponse(res, 203, "User is deleted successfully", result);
});

export const userController = {
  createUser,
  getUser,
  singleUser,
  updateUser,
  deletedUser
};
