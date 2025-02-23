import mongoose, { Model, Schema, HydratedDocument } from "mongoose";
import { ITour, TourModel } from "./tour.interface";

const tourSchema = new Schema<ITour, TourModel>({
  name: { type: String, required: [true, "Name is required"] },
  durationHours: {
    type: Number,
    required: [true, "Duration (hours) is required"],
  },
  averageRating: { type: Number, default: 4.5 },
  coverImages: { type: String, required: [true, "Cover image is required"] },
  images: { type: [String], default: [] },
  price: { type: Number, required: [true, "Price is required"] },
  availableseat: {
    type: Number,
    required: [true, "Availableseat is requried"],
  },
  startDate: { type: [Date], required: [true, "Start date is required"] },
  startLocation: {
    type: String,
    required: [true, "Start location is required"],
  },
  location: { type: [String], required: [true, "Locations are required"] },
  slug: { type: String, required: [true, "Slug is required"] },
});

tourSchema.static("myStaticMethod", async function () {
  const today = new Date();
  const tours = await this.startDate.filter((date: Date) => date > today);

  tours.sort((a: Date, b: Date) => a.getTime() - b.getTime());

  const nearestStartDate = tours[0];
  const estimatedEndDate = new Date(
    nearestStartDate.getTime() + this.durationHours * 60 * 60 * 1000
  );
  return { nearestStartDate, estimatedEndDate };
});

const Tour = mongoose.model<ITour, TourModel>("Tour", tourSchema);
export default Tour;
