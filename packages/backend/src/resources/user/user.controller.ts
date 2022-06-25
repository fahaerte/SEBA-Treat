import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "../../resources/user/user.validation";
import HttpException from "../../utils/exceptions/http.exception";
import authenticate from "../../middleware/authenticated.middleware";
import profileFileUpload from "../../middleware/upload.middleware";

import UserService from "../../resources/user/user.service";
import User from "./user.interface";
import { Service } from "typedi";

@Service()
class UserController implements Controller {
  public path = "/users";
  public router = Router();

  constructor(private readonly userService: UserService) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /api/users/register:
     *  post:
     *    tags:
     *    - User
     *    summary: Register a user
     *    parameters:
     *    - name: username
     *      description: username of user
     *      in: body
     *      required: true
     *      schema:
     *        $ref: '#/definitions/RegisterUser'
     *    - name: email
     *      description: email of user
     *      in: body
     *      required: true
     *      schema:
     *        $ref: '#/definitions/RegisterUser'
     *    - name: password
     *      description: password of user
     *      in: body
     *      schema:
     *        $ref: '#/definitions/RegisterUser'
     *    responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Any Error
     */
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );

    /**
     * @swagger
     * /api/users/login:
     *  post:
     *    tags:
     *    - User
     *    summary: Login user
     *    parameters:
     *    - name: email
     *      description: email of user
     *      in: body
     *      required: true
     *      schema:
     *        $ref: '#/definitions/LoginUser'
     *    - name: password
     *      description: password of user
     *      in: body
     *      required: true
     *      schema:
     *        $ref: '#/definitions/LoginUser'
     *    responses:
     *      200:
     *        description: LoggedIn
     *      400:
     *        description: Any Error
     */
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );

    /**
     * @swagger
     * /api/users:
     *  get:
     *    tags:
     *    - User
     *    summary: Get currently logged in user
     *    produces:
     *    - application/json
     *    responses:
     *      200:
     *        description: Returns current user
     *      404:
     *        description: no user logged in
     *      401:
     *        description: Unauthorised
     */
    this.router.get(`${this.path}`, authenticate, this.getUser);

    /**
     * @swagger
     * /api/users/profile-picture:
     *  post:
     *    consumes:
     *     - multipart/form-data
     *    tags:
     *    - User
     *    summary: Upload profile picture
     *    parameters:
     *    - name: photo
     *      description: email
     *      in: formData
     *      type: file
     *      required: true
     *    responses:
     *      201:
     *        description: Profile picture uploaded successfully
     */
    this.router.post(
      `${this.path}/profile-picture`,
      authenticate,
      profileFileUpload.single("profilePicture"),
      this.uploadProfilePicture
    );

    /**
     * @swagger
     * /api/users/profile-picture/:userid:
     *  get:
     *    tags:
     *    - User
     *    summary: Get profile picture of user
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        type: string
     *        description: the user's id
     *    produces:
     *    - application/json
     *    responses:
     *      404:
     *        description: Not user logged in
     *      400:
     *        description: Any other error
     */
    this.router.get(
      `${this.path}/profile-picture/:userid?`,
      authenticate,
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
      const token = await this.userService.register(newUser);

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

      const token = await this.userService.login(
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
        profilePicturePath = this.userService.getProfilePicturePath(
          req.user._id
        );
      } else {
        profilePicturePath = this.userService.getProfilePicturePath(
          req.params.userid
        );
      }
      res.sendFile(profilePicturePath);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;