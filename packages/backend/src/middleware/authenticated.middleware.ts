import { NextFunction, Request, Response } from "express";
import UserModel from "../resources/user/user.model";
import Token from "../utils/interfaces/token.interface";
import HttpException from "../utils/exceptions/http.exception";
import jwt from "jsonwebtoken";
import tokenUtil from "../utils/tokenUtil";

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const token = req.cookies["Authorization"];

  if (!token) {
    return next(new HttpException(401, "Unauthorised"));
  }
  return addUserToRequest(req, res, next, token);
}

async function addUserToRequest(
  req: Request,
  res: Response,
  next: NextFunction,
  token: string
): Promise<Response | void> {
  try {
    const payload: Token | jwt.JsonWebTokenError = await tokenUtil.verifyToken(
      token
    );
    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, "Unauthorised"));
    }

    const user = await UserModel.findById(payload.id)
      .select("-password")
      .exec();

    if (!user) {
      return next(new HttpException(401, "Unauthorised"));
    }
    req.user = user;
    return next();
  } catch (error: any) {
    return next(new HttpException(401, "Unauthorised"));
  }
}

export { authenticatedMiddleware };