import { NextFunction, Request, Response } from "express";
import token from "../utils/token";
import UserModel from "../resources/user/user.model";
import Token from "../utils/interfaces/token.interface";
import HttpException from "../utils/exceptions/http.exception";
import jwt from "jsonwebtoken";
import Logger, { ILogMessage } from "../utils/logger";

async function optionalAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (bearer && bearer.startsWith("Bearer")) {
    return addUserToRequest(req, res, next, bearer);
  }
  return next();
}

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer")) {
    return next(new HttpException(401, "Unauthorised"));
  }
  return addUserToRequest(req, res, next, bearer);
}

async function addUserToRequest(
  req: Request,
  res: Response,
  next: NextFunction,
  bearer: string
): Promise<Response | void> {
  const accessToken = bearer.split("Bearer ")[1].trim();
  try {
    const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(
      accessToken
    );

    if (payload instanceof jwt.JsonWebTokenError) {
      Logger.error({
        functionName: "addUserToRequest",
        message: "jwt.JSONWebTokenError",
        details: payload,
      } as ILogMessage);
      return next(new HttpException(401, "Unauthorised"));
    }

    const user = await UserModel.findById(payload.id)
      .select("-password")
      .exec();

    if (!user) {
      Logger.error({
        functionName: "addUserToRequest",
        message: "Could not find user",
        details: `User id ${payload.id}`,
      } as ILogMessage);
      return next(new HttpException(401, "Unauthorised"));
    }

    req.user = user;
    return next();
  } catch (error: any) {
    Logger.error({
      functionName: "addUserToRequest",
      message: "Could not verify jwt",
      details: error.message,
    } as ILogMessage);
    return next(new HttpException(401, "Unauthorised"));
  }
}

export { authenticatedMiddleware, optionalAuthenticatedMiddleware };
