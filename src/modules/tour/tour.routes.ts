import express from "express";
import { tourController } from "./tour.controller";
import {upload} from "../../helper/fileUploadsHelper";
const router = express.Router();


router.post("/create-tour", upload.single('file'), tourController.createTour);
router.get("/", tourController.getTour);
router.get("/:id", tourController.singleTour);
router.patch("/:id", tourController.updateTour);
router.delete("/:id", tourController.deletedTour);
// router.get("/next-schedule/:id", tourController.nextSchedule);


export const tourRouter = router;
