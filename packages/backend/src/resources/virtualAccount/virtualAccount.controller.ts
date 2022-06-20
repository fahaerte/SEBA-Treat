import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "../../resources/virtualAccount/virtualAccount.validation";
import HttpException from "../../utils/exceptions/http.exception";
import authenticated from "../../middleware/authenticated.middleware";
import VirtualAccountService from "../../resources/virtualAccount/virtualAccount.service";

class VirtualAccountController implements Controller {
  public path = "/accounts";
  public router = Router();
  private virtualAccountService = new VirtualAccountService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/create`,
      authenticated,
      validationMiddleware(validate.createAccount),
      this.createAccount
    );
  }

  // TODO: delete (legacy, no controller needed since account creation is done automatically when creating user)
  private createAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const balance = req.body.balance;
      const account = await this.virtualAccountService.createAccount(balance);

      res.status(201).json({ account });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default VirtualAccountController;
