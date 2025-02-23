import mongoose from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: [true, "User name is requried"] },
    age: { type: Number },
    email: {
      type: String,
      required: [true, "User email is requried"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "please provide a valid email {VALUE}",
      ],
      immutable: true,
    },
    password: {
      type: String,
      required: [true, "Password is requried"],
      select: false,
    },
    photo: String,
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "please provide valid role {VALUE}",
      },
      default: "user",
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

userSchema.pre("find", function (next) {
  this.find({ status: { $eq: "active" } });
  next();
});

userSchema.post("find", function (docs, next) {
  docs.forEach((doc: IUser) => {
    doc.name = doc?.name?.toUpperCase();
  });
  next();
});
userSchema.post("findOne", function (docs, next) {
  docs.name = docs.name.toUpperCase();
  next();
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.round));
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "✍️";
  next();
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
