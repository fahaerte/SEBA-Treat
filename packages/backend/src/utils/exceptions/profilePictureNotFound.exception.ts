import HttpException from "./http.exception";

class ProfilePictureNotFoundException extends HttpException {
  constructor(userId: string) {
    super(404, `Could not find profile picture for user ${userId}`);
  }
}

export default ProfilePictureNotFoundException;
