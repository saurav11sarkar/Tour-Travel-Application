import { Response } from "express";

const handleValidationError = (err: any, res: Response) => {
  const issues = Object.values(err.errors).map(({ message, path }: any) => ({
    path,
    message,
  }));
  res
    .status(400)
    .json({ success: false, message: err.message, issues: issues, error: err });

};

export default handleValidationError;
