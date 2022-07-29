import { Service } from "typedi";
import CreditPackageModel from "./creditPackage.model";
import CreditPackage from "./creditPackage.interface";

@Service()
class CreditPackageService {
  private creditPackageModel = CreditPackageModel;

  /**
   * Get all credit packages
   */
  public async getCreditPackages(): Promise<CreditPackage[] | Error> {
    try {
      console.log(this.creditPackageModel.find());
      return await this.creditPackageModel.find();
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }
}

export default CreditPackageService;
