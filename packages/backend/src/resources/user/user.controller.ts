import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "../../resources/user/user.validation";
import UserService from "../../resources/user/user.service";
import HttpException from "../../utils/exceptions/http.exception";
import authenticated from "../../middleware/authenticated.middleware";
import profileFileUpload from "../../middleware/upload.middleware";
import User from "./user.interface";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );
    this.router.get(`${this.path}`, authenticated, this.getUser);
    this.router.post(
      `${this.path}/profile-picture`,
      authenticated,
      profileFileUpload.single("profilePicture"),
      this.uploadProfilePicture
    );
    this.router.get(
      `${this.path}/profile-picture/:userid?`,
      authenticated,
      this.getProfilePicture
    );
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const newUser = req.body as User;
      const token = await this.UserService.register(newUser);

      res.status(201).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      const token = await this.UserService.login(
        email as string,
        password as string
      );
      res.status(200).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    res.status(200).send({ data: req.user });
  };

  private uploadProfilePicture = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    res.status(201).send("Your profile picture was uploaded");
  };

  private getProfilePicture = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    try {
      let profilePicturePath;
      if (!req.params.userid) {
        profilePicturePath = this.UserService.getProfilePicturePath(
          req.user._id
        );
      } else {
        profilePicturePath = this.UserService.getProfilePicturePath(
          req.params.userid
        );
      }
      res.sendFile(profilePicturePath);
    } catch (error: any) {
      next(new HttpException(404, error.message));
    }
  };
}

export default UserController;
