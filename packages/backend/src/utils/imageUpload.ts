import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import HttpException from "../utils/exceptions/http.exception";
import path from "path";
import { v4 as uuidV4 } from "uuid";
import Logger, { ILogMessage } from "./logger";
import * as fs from "fs";
import { mkdirSync } from "fs";

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
    const pathName = checkPublicFolder("profile-pictures");
    cb(null, pathName);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    const fileName = saveFile("profile-pictures", file);
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
    const pathName = checkPublicFolder("meal-images");
    cb(null, pathName);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    const fileName = saveFile("meal-images", file);
    req.body.image = fileName;
    cb(null, fileName);
  },
});

const checkPublicFolder = (publicFolderName: string): string => {
  const pathName = path.join(process.cwd(), "public", publicFolderName);
  if (!fs.existsSync(pathName)) {
    Logger.info({
      functionName: "checkPublicFolder",
      message: `Directory ${publicFolderName} does not exist in public folder`,
    } as ILogMessage);
    mkdirSync(pathName);
    Logger.info({
      functionName: "checkPublicFolder",
      message: `Created public directory`,
      details: `Directory name: ${publicFolderName}`,
    } as ILogMessage);
  }
  return pathName;
};

const saveFile = (dirName: string, file: Express.Multer.File): string => {
  const fileName = `${uuidV4()}${path.extname(file.originalname)}`;
  Logger.info({
    functionName: "saveFile",
    message: "Created file",
    details: `Created file ${fileName} in public directory ${dirName}`,
  } as ILogMessage);
  return fileName;
};

const deleteImage = (dirName: string, fileName: string): void => {
  const pathName = path.join(checkPublicFolder(dirName), fileName);
  if (fs.existsSync(pathName)) {
    fs.unlinkSync(pathName);
    Logger.info({
      functionName: "deleteImage",
      message: "Deleted image",
      details: `Image ${pathName}`,
    } as ILogMessage);
  }
};

export { imageUploadFilter, profileFileStorage, mealOfferStorage, deleteImage };
