import UserModel from "../user/user.model";
import token from "../../utils/token";
import path from "path";
import * as fs from "fs";
import User from "../../../lib/resources/user/user.interface";

class UserService {
    private user = UserModel;

    /**
     * Register a new user
     */
    public async register(
        newUser: User
    ): Promise<string | Error> {
        try {
            const user = await this.user.create(newUser);
            return token.createToken(user);
        } catch (error: any) {
            throw new Error(error.message as string);
        }
    }

    /**
     * Attempt to login a user
     */
    public async login(email: string, password: string): Promise<string | Error> {
        try {
            const user = await this.user.findOne({email});

            if (!user) {
                throw new Error("Unable to find user with that email address");
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error("Wrong credentials given");
            }
        } catch (error) {
            throw new Error("Unable to create user");
        }
    }

    /**
     * Attempt to get path to profile picture
     * @param userid
     */
    public getProfilePicturePath(userid: string): string {
        const profilePicturesPath = path.resolve(
            __dirname,
            "../../../profilePictures"
        );
        const picturesList = fs.readdirSync(profilePicturesPath);
        const pictureForId = picturesList.find((element) =>
            element.includes(userid)
        );
        if (!pictureForId) {
            throw new Error("User has no profile picture");
        }
        return path.join(profilePicturesPath, pictureForId);
    }
}

export default UserService;
