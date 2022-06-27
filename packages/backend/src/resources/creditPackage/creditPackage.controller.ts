import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import authenticate from "../../middleware/authenticated.middleware";
import CreditPackageService from "./creditPackage.service";

class CreditPackageController implements Controller {
  public path = "/creditPackages";
  public router = Router();
  private creditPackageService = new CreditPackageService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, authenticate, this.getCreditPackages);
  }

  private getCreditPackages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const creditPackages =
        await this.creditPackageService.getCreditPackages();
      res.status(200).send({ data: creditPackages });
    } catch (error: any) {
      next(error);
    }
  };
}

export default CreditPackageController;
