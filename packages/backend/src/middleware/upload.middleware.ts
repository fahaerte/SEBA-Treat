import multer from "multer";
import { imageUploadFilter, mealOfferStorage } from "../utils/imageUpload";

const mealOfferFileUpload = multer({
  fileFilter: imageUploadFilter,
  storage: mealOfferStorage,
});

export { mealOfferFileUpload };
