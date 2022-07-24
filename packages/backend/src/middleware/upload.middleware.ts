import multer from "multer";
import { imageUploadFilter, profileFileStorage } from "../utils/imageUpload";

const profileFileUpload = multer({
  fileFilter: imageUploadFilter,
  storage: profileFileStorage,
});

export default profileFileUpload;
