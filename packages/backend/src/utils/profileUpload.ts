import {Request} from "express";
import multer, {FileFilterCallback} from "multer";
import HttpException from "../../lib/utils/exceptions/http.exception";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const profileFilterFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
): void => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb(new HttpException(422, "Unsupported file type"));
    }
}

export const profileFileStorage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: DestinationCallback
    ): void => {
        cb(null, 'profilePictures/')
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
    ): void => {
        if (!req.user) {
            cb(new HttpException(400, "No logged in user"), "");
        } else {
            cb(null, `${req.user._id}${path.extname(file.originalname)}`)
        }
    }
})

export default {fileFilter: profileFilterFilter, fileStorage: profileFileStorage};