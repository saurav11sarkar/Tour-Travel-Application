import { uploadToCloudinary } from "../../helper/fileUploadsHelper";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { tourService } from "./tour.service";

const createTour = catchAsync(async (req, res) => {
  const body = JSON.parse(req.body.data);
  if (req.file) {
    const imagesName = req.file.filename;
    const path = req.file.path;
    const uploadResult = await uploadToCloudinary(imagesName, path);
    body.coverImages = uploadResult.secure_url as string;
  }

  const result = await tourService.createTour(body);
  sendResponse(res, 201, "Tour is create successfully", result);
});
const getTour = catchAsync(async (req, res) => {
  const result = await tourService.getTour(req.query);
  sendResponse(res, 201, "Tour is retrive successfully", result);
});
const singleTour = catchAsync(async (req, res) => {
  const result = await tourService.singleTour(req.params.id);
  sendResponse(res, 201, "Tour is retrive successfully", result);
});
const updateTour = catchAsync(async (req, res) => {
  const result = await tourService.updateTour(req.params.id, req.body);
  sendResponse(res, 201, "Tour is Update successfully", result);
});
const deletedTour = catchAsync(async (req, res) => {
  const result = await tourService.deletedTour(req.params.id);
  sendResponse(res, 201, "Tour is deleted successfully", result);
});

// const nextSchedule = catchAsync(async (req, res) => {
//   const result = await tourService.nextSchedule(req.params.id);
//   sendResponse(res, 200, "Next schudile", result);
// });

export const tourController = {
  createTour,
  getTour,
  singleTour,
  updateTour,
  deletedTour,
  // nextSchedule
};
