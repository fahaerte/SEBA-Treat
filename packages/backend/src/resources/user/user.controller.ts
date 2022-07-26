import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "../../resources/user/user.validation";
import HttpException from "../../utils/exceptions/http.exception";
import { authenticatedMiddleware } from "../../middleware/authenticated.middleware";
import { profileFileUpload } from "../../middleware/upload.middleware";

import UserService from "../../resources/user/user.service";
import { Service } from "typedi";
import { ObjectId } from "mongoose";
import StripeService from "../stripe/stripe.service";

@Service()
class UserController implements Controller {
  public path = "/users";
  public router = Router();

  constructor(
    private readonly userService: UserService,
    private readonly stripeService: StripeService
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      profileFileUpload.single("profilePicture"),
      validationMiddleware(validate.registerBody),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.loginBody),
      this.login
    );
    this.router.get(
      `${this.path}/account-balance`,
      authenticatedMiddleware,
      this.getAccountBalance
    );
    this.router.get(
      `${this.path}/:userId?`,
      authenticatedMiddleware,
      this.getUser
    );

    this.router.get(`${this.path}/:userId?/preview`, this.getUserPreview);
    this.router.post(`${this.path}/signout`, this.signout);

    this.router.put(
      `${this.path}`,
      authenticatedMiddleware,
      validationMiddleware(validate.updateUser),
      this.updateUser
    );

    this.router.put(
      `${this.path}/password`,
      authenticatedMiddleware,
      validationMiddleware(validate.updatePassword),
      this.updatePassword
    );
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const newUser = req.body;
      const { userId } = await this.userService.register(newUser);
      const { city, country, street, postalCode, houseNumber } =
        newUser.address;
      const stripeUserId = await this.stripeService.stripeUsers.createCustomer(
        userId,
        `${newUser.firstName} ${newUser.lastName}`,
        newUser.email,
        {
          city,
          country,
          line1: `${street} ${houseNumber}`,
          postal_code: postalCode,
        }
      );
      await this.userService.updateUser({
        _id: userId,
        stripeCustomerId: stripeUserId,
      });

      res.status(200).json("Registered successfully!");
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

      const { userId, address, token } = await this.userService.login(
        email as string,
        password as string
      );

      res.cookie("Authorization", token, {
        httpOnly: true,
      });
      res.status(200).send({ userId, address });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private signout = (req: Request, res: Response): Response | void => {
    res.clearCookie("Authorization");
    res.status(200).send("Removed cookie");
  };

  private getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    try {
      let userId;
      if (req.params.userId) {
        userId = req.params.userId;
      }
      if (userId) {
        const user = await this.userService.getUser(userId);
        res.status(200).send({ data: user });
      } else {
        res.status(404).send({ data: "user not found!" });
      }
    } catch (error: any) {
      next(error);
    }
  };

  private getUserPreview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (req.params.userId) {
        const userId = req.params.userId;
        const userPrev = await this.userService.getUserPreview(userId);
        res.status(200).send({ data: userPrev });
      } else {
        res.status(404).send({ data: "user not found!" });
      }
    } catch (error: any) {
      next(error);
    }
  };

  private getAccountBalance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    try {
      const balance = await this.userService.getAccountBalance(
        req.user._id as ObjectId
      );
      res.status(200).send({ accountBalance: balance });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    try {
      const newUser = await this.userService.updateUser(req.body);
      res.status(200).send(newUser);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    try {
      const { passwordOld, passwordNew, userId } = req.body;
      const editedUser = await this.userService.updateUserPassword(
        passwordOld as string,
        passwordNew as string,
        userId as string
      );
      res.status(200).json(editedUser);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
