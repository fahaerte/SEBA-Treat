import { Service } from "typedi";
import { Router } from "express";
import StripeService from "./stripe.service";

// @Service
class StripeController {
  public path = "/payment";
  public router = Router();

  constructor(private readonly stripeService: StripeService) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    console.log("hi");
  }
}

export default StripeController;
