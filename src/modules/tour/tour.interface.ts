import { HydratedDocument, Model } from "mongoose";

export interface ITour {
  name: string;
  durationHours: number;
  averageRating: number;
  price: number;
  availableseat:number;
  coverImages: string;
  images?: string[];
  startDate: Date[];
  startLocation: string;
  location: string[];
  slug: string;
}

export interface ITourModel {
  myStaticMethod(): {
    nearestStartDate: Date | null;
    estimatedEndDate: Date | null;
  };
}


export interface TourModel extends Model<ITour,Record<string,unknown>,ITourModel> {
  durationHours: number;
  startDate: Date[];
  myStaticMethod(): Promise<HydratedDocument<ITour,ITourModel>>;
}


