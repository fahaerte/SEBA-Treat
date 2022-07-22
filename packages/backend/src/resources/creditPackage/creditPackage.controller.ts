import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import { authenticatedMiddleware } from "../../middleware/authenticated.middleware";
import CreditPackageService from "./creditPackage.service";

class CreditPackageController implements Controller {
  public path = "/creditPackages";
  public router = Router();
  private creditPackageService = new CreditPackageService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      `${this.path}`,
      authenticatedMiddleware,
      this.getCreditPackages
    );
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
