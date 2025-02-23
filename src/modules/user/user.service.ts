import { IUser } from "./user.interface";
import User from "./user.model";

const createUser = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const getUser = async () => {
  const result = await User.find();
  return result;
};

const singleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deletedUser = async(id:string) =>{
    const result = await User.findByIdAndDelete(id);
    return result;
}

export const userService = {
  createUser,
  getUser,
  singleUser,
  updateUser,
  deletedUser
};
