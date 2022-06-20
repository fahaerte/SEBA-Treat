import multer from "multer";
import {
  profileFilterFilter,
  profileFileStorage,
} from "../utils/profileUpload";

const profileFileUpload = multer({
  fileFilter: profileFilterFilter,
  storage: profileFileStorage,
});

export default profileFileUpload;
