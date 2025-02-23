import express from "express";
import { bookingController } from "./booking.controller";
const router = express.Router();

router.post("/create-booking", bookingController.createBooking);
router.get("/", bookingController.getBooking);
router.get("/:id", bookingController.singleBooking);
router.patch("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deletedBooking);

export const bookingRouter = router;
