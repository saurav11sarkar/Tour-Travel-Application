import mongoose from "mongoose";
import Tour from "../tour/tour.model";
import User from "../user/user.model";
import { IBooking } from "./booking.interface";
import Booking from "./booking.model";

const createBooking = async (payload: IBooking) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(payload.user).session(session);
    if (!user) throw new Error("User is not found");

    const tour = await Tour.findById(payload.tour).session(session);
    if (!tour) throw new Error("Tour id is not found");

    if (payload.bookSlort > tour.availableseat) {
      throw new Error("Not enough seats available");
    }

    payload.totalPrice = tour.price * payload.bookSlort;
    payload.bookingStatus = "paid";

    tour.availableseat -= payload.bookSlort;

    await tour.save({ session });
    const result = await Booking.create([payload], { session });
    await session.commitTransaction();
    session.endSession();
    return result[0];
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error || "Failed to create booking");
  }
};

const getBooking = async () => {
  const result = await Booking.find();
  return result;
};

const singleBooking = async (id: string) => {
  const result = await Booking.findById(id);
  return result;
};

const updateBooking = async (id: string, payload: IBooking) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findById(id).session(session);
    if (!booking) throw new Error("Booking not found");

    const tour = await Tour.findById(booking.tour).session(session);
    if (!tour) throw new Error("Tour not found");

    if (payload.bookSlort !== undefined) {
      const seatDifference = payload.bookSlort - booking.bookSlort;
      if (seatDifference > tour.availableseat) {
        throw new Error("Not enough seats available");
      }
      tour.availableseat -= seatDifference;
      payload.totalPrice = tour.price * payload.bookSlort;
    }

    await tour.save({ session });
    const result = await Booking.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error.message || "Failed to update booking");
  }
};

const deletedBooking = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findById(id).session(session);
    if (!booking) throw new Error("Booking not found");

    const tour = await Tour.findById(booking.tour).session(session);
    if (tour) {
      tour.availableseat += booking.bookSlort;
      await tour.save({ session });
    }

    const result = await Booking.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error.message || "Failed to delete booking");
  }
};

export const bookingService = {
  createBooking,
  getBooking,
  singleBooking,
  updateBooking,
  deletedBooking,
};
