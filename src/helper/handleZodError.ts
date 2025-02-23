import { Response } from "express";

export const handleZodError = (err: any, res: Response) => {
  const issues = Object.values(err.issues).map((issue: any) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
  res.status(404).json({
    success: false,
    message: err.message,
    issues: issues,
    error: err,
  });
};
export default handleZodError;
