import multer from "multer";
import {
  imageUploadFilter,
  mealOfferStorage,
  profileFileStorage,
} from "../utils/imageUpload";

const profileFileUpload = multer({
  fileFilter: imageUploadFilter,
  storage: profileFileStorage,
});

const mealOfferFileUpload = multer({
  fileFilter: imageUploadFilter,
  storage: mealOfferStorage,
});

export { profileFileUpload, mealOfferFileUpload };
