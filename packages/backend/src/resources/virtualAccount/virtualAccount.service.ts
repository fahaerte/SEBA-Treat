import VirtualAccount from "./virtualAccount.interface";
import VirtualAccountModel from "./virtualAccount.model";
import { ObjectId, Types } from "mongoose";
import VirtualBankService from "../../resources/virtualBank/virtualBank.service";
import VirtualAccountType from "./virtualAccountType.enum";

class VirtualAccountService {
  private virtualAccountModel = VirtualAccountModel;
  private virtualBankService = new VirtualBankService();

  /**
   * Create a new account
   */
  public async createAccount(
    virtualBankId: ObjectId,
    accountType = VirtualAccountType.USER_ACCOUNT
  ): Promise<VirtualAccount | Error> {
    try {
      let balance = 0;
      if (accountType === VirtualAccountType.USER_ACCOUNT) {
        balance = (await this.virtualBankService.geUserStartingBalance(
          virtualBankId
        )) as number;
      }
      return await this.virtualAccountModel.create({
        virtualBankId,
        accountType,
        balance,
      });
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Delete an account
   */
  public async deleteAccount(id: Types.ObjectId): Promise<string | Error> {
    try {
      await this.virtualAccountModel.findByIdAndDelete(id);
      return "deleted";
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Send transaction
   */
  public async sendTransaction(
    accountId: ObjectId,
    amount: number
  ): Promise<number | Error> {
    try {
      // TODO: can't this be done nicer?
      const account = (await this.virtualAccountModel.findById(
        accountId
      )) as VirtualAccount;
      console.log(account);
      const newBalance = account.balance - amount;
      console.log(newBalance);
      await this.virtualAccountModel.findByIdAndUpdate(
        { _id: accountId },
        { balance: newBalance }
      );
      return (
        (await this.virtualAccountModel.findById(accountId)) as VirtualAccount
      ).balance;
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Receive transaction
   */
  public async receiveTransaction(
    accountId: ObjectId,
    amount: number
  ): Promise<number | Error> {
    try {
      const account = (await this.virtualAccountModel.findById(
        accountId
      )) as VirtualAccount;
      const newBalance = account.balance + amount;
      await this.virtualAccountModel.findByIdAndUpdate(
        { _id: accountId },
        { balance: newBalance }
      );
      return (
        (await this.virtualAccountModel.findById(accountId)) as VirtualAccount
      ).balance;
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }
}

export default VirtualAccountService;
