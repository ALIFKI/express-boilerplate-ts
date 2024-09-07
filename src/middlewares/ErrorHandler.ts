import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err, "middleware");
  if (err.name == "ValidationError") {
    const humanReadableErrors = err.details.map(
      (detail: any) => `${detail.message}`
    );
    return res.status(400).json({
      success: false,
      statusCode: 400,
      error: "Validation",
      message: humanReadableErrors,
      // data: err,
    });
  }
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Server Error",
    error: err.message,
  });
};
