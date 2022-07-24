import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import HttpException from "../utils/exceptions/http.exception";
import path from "path";
import { v4 as uuidV4 } from "uuid";
import Logger, { ILogMessage } from "./logger";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const imageUploadFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new HttpException(422, "Unsupported file type"));
  }
};

const profileFileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    cb(null, path.join("public", "profile-pictures"));
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    const fileName = `${uuidV4()}${path.extname(file.originalname)}`;
    Logger.info({
      functionName: "profileFileStorage",
      message: "Saved profile picture",
      details: `User ${req.user._id} fileName ${fileName}`,
    } as ILogMessage);
    req.body.profilePicture = fileName;
    cb(null, fileName);
  },
});

const mealOfferStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    cb(null, "mealOfferImages/");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    const fileName = `${uuidV4()}${path.extname(file.originalname)}`;
    req.body.mealOfferImage = fileName;
    cb(null, fileName);
  },
});

export { imageUploadFilter, profileFileStorage, mealOfferStorage };
