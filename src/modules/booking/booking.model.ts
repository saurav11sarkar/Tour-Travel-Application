import mongoose from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is requrid"],
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: [true, "Tour id is requrid"],
    },
    bookSlort: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    bookingStatus: {
      type: String,
      enum: {
        values: ["pending", "paid", "cancelled"],
        message: "{VALUE} is not corret",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
