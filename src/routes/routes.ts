import express from "express";
import { userRouter } from "../modules/user/user.routes";
import { tourRouter } from "../modules/tour/tour.routes";
import { bookingRouter } from "../modules/booking/booking.routes";
import { authRouter } from "../modules/auth/auth.routes";
const router = express.Router();

router.use("/auth",authRouter);
router.use("/user", userRouter);
router.use("/tour", tourRouter);
router.use("/booking", bookingRouter);

export default router;
