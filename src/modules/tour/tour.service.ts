import QueryBuilder from "../../builder/queryBuilder";
import { ITour } from "./tour.interface";
import Tour from "./tour.model";

const createTour = async (payload: ITour) => {
  const result = await Tour.create(payload);
  return result;
};
const getTour = async (query: Record<string, unknown>) => {
  const searchAbleFields = ["name", "location", "startLocation"];
  const tour = new QueryBuilder(Tour.find(), query)
    .search(searchAbleFields)
    .filter()
    .limitFields()
    .paginate()
    .sort();

  const result = await tour.modelQuery;
  return result;
};
const singleTour = async (id: string) => {
  const result = await Tour.findById(id);
  return result;
};
const updateTour = async (id: string, payload: Partial<ITour>) => {
  const result = await Tour.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deletedTour = async (id: string) => {
  const result = await Tour.findByIdAndDelete(id);
  return result;
};

// const nextSchedule = async (id: string) => {
//   // const tours = await Tour.findById(id);
//   const result = Tour?.myStaticMethod();
//   return  result ;
// };

export const tourService = {
  createTour,
  getTour,
  singleTour,
  updateTour,
  deletedTour,
  // nextSchedule,
};
