import { Response } from "express";

const handleCastError = (err: any, res: Response) => {
  return res.status(400).json({
    success: false,
    name: err.name,
    message: err.message,
    error: err,
  });
};

export default handleCastError;
