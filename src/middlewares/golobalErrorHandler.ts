import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import handleCastError from "../helper/handleCastError";
import handleValidationError from "../helper/handleValidationError";
import handleZodError from "../helper/handleZodError";
import handleGenericError from "../helper/handleGenericError";
import config from "../config";
import handleDuplectError from "../helper/handleDuplectError";

type TErrorResponse = {
  success: boolean;
  message: string;
  error: any;
};

export const globalErrorHandler = (
  err: TErrorResponse | any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err.code && err.code === 11000) {
    handleDuplectError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err.name === "ZodError") {
    handleZodError(err, res);
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  }

  res.status(500).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack === config.env ? err.stack : "🤡",
  });
};
