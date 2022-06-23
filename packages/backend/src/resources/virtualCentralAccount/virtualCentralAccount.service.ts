import VirtualAccount from "../virtualAccount/virtualAccount.interface";
import VirtualAccountModel from "../virtualAccount/virtualAccount.model";
import { Service } from "typedi";

@Service()
class VirtualCentralAccountService {
  private virtualAccountModel = VirtualAccountModel;

  /**
   * Create a new account
   */
  public async createCentralAccount(): Promise<VirtualAccount | Error> {
    try {
      const balance = 0;
      if ((await this.virtualAccountModel.count()) === 0) {
        console.log("Creating new central account.");
        return (await this.virtualAccountModel.create({
          balance: balance,
        })) as VirtualAccount;
      } else {
        throw new Error("A central account exists already.");
      }
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Receive transaction
   */
  public async receiveTransaction(
    amount: number
  ): Promise<VirtualAccount | Error> {
    try {
      if ((await this.virtualAccountModel.count()) === 0) {
        await this.createCentralAccount();
      }
      if ((await this.virtualAccountModel.count()) === 1) {
        console.log("Central account found. Updating balance.");
        const virtualCentralAccount =
          (await this.virtualAccountModel.findOne()) as VirtualAccount;
        virtualCentralAccount.balance += amount;
        return await virtualCentralAccount.save();
      } else {
        throw new Error(
          "There seem to be more than one central accounts. Please contact system admin."
        );
      }
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }
}

export default VirtualCentralAccountService;
