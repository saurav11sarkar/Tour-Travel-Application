import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingService.createBooking(req.body);
  sendResponse(res, 201, "Booking create successfuly", result);
});

const getBooking = catchAsync(async (req, res) => {
  const result = await bookingService.getBooking();
  sendResponse(res, 200, "Booking is retrive successfuly", result);
});
const singleBooking = catchAsync(async (req, res) => {
  const result = await bookingService.singleBooking(req.params.id);
  sendResponse(res, 200, "Single booking is retrive successfuly", result);
});
const updateBooking = catchAsync(async (req, res) => {
  const result = await bookingService.updateBooking(req.params.id, req.body);
  sendResponse(res, 200, "Booking is update successfuly", result);
});
const deletedBooking = catchAsync(async (req, res) => {
  const result = await bookingService.deletedBooking(req.params.id);
  sendResponse(res, 200, "Booking is deleted successfuly", result);
});

export const bookingController = {
  createBooking,
  getBooking,
  singleBooking,
  updateBooking,
  deletedBooking,
};
