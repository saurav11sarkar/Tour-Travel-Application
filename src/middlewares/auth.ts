import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import User from "../modules/user/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}



const auth = (requestRole: string[]|string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) throw new Error("You are not authorized");
      const decode = jwt.verify(token, config.secrit as string) as JwtPayload;
      const { email, role } = decode;
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid token: User not found");

      if (Array.isArray(requestRole)) {
        if (!requestRole.includes(role)) {
          throw new Error("You are not authorized to access this resource");
        }
      } else if (requestRole !== role) {
        throw new Error("You are not authorized to access this resource");
      }

      req.user = decode as JwtPayload;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
