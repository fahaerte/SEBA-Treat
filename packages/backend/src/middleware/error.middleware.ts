import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/exceptions/http.exception";

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const errorName = error.name;
  console.log(errorName);
  let status = error.status || 500;
  const message = error.message || "Something went wrong";

  if(errorName === "BSONTypeError") {
    status = 400;
  }

  res.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
