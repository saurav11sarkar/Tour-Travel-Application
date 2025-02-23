import { Types } from "mongoose";

export interface IBooking {
  user: Types.ObjectId;
  tour: Types.ObjectId;
  bookSlort: number;
  totalPrice:number;
  bookingStatus: "pending" | "paid" | "cancelled";
}
