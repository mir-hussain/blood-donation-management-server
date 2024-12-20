import { ErrorRequestHandler } from "express";
import config from "../config";
import { TErrorSources } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("global error");
  //setting default values
  let statusCode = 500;
  let message = "Something went wrong!";

  if (err.message) {
    message = err.message;
  }

  //ultimate return
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;
