import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import authenticated from "../../middleware/authenticated.middleware";
import VirtualBankService from "./virtualBank.service";
import { ObjectId } from "mongoose";
import VirtualAccountService from "../../resources/virtualAccount/virtualAccount.service";
import VirtualBank from "./virtualBank.interface";
import VirtualAccount from "../../resources/virtualBank/virtualBank.interface";
import VirtualAccountType from "../../resources/virtualAccount/virtualAccountType.enum";

class VirtualBankController implements Controller {
  public path = "/banks";
  public router = Router();
  private virtualBankService = new VirtualBankService();
  private virtualAccountService = new VirtualAccountService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/create`,
      authenticated,
      //validationMiddleware(validate.createAccount),
      this.createBank
    );
    this.router.post(
      `${this.path}/initialize/:virtualBankId`,
      authenticated,
      //validationMiddleware(validate.createAccount),
      this.createBank
    );
  }

  private createBank = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { centralFee, userStartingBalance } = req.body;
      const bank = (await this.virtualBankService.createBank(
        centralFee as number,
        userStartingBalance as number
      )) as VirtualBank;
      const account = (await this.virtualAccountService.createAccount(
        bank._id as ObjectId,
        VirtualAccountType.BANK_ACCOUNT
      )) as unknown as VirtualAccount;
      const initBank = await this.virtualBankService.initializeBank(
        bank._id as ObjectId,
        account._id as ObjectId
      );

      res.status(201).json({ initBank });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default VirtualBankController;
