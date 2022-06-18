import { ObjectId } from "mongoose";
import VirtualBankModel from "./virtualBank.model";
import VirtualBank from "./virtualBank.interface";

class VirtualBankService {
  private virtualBankModel = VirtualBankModel;

  /**
   * Create a new bank
   */
  public async createBank(
    centralFee: number,
    userStartingBalance: number
  ): Promise<VirtualBank | Error> {
    try {
      const virtualBank = (await this.virtualBankModel.create({
        centralFee,
        userStartingBalance,
      })) as VirtualBank;
      return (await this.virtualBankModel.findById(
        virtualBank._id
      )) as VirtualBank;
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Initialize bank (add central account to bank)
   */
  public async initializeBank(
    virtualBankId: ObjectId,
    virtualAccountId: ObjectId
  ): Promise<VirtualBank | Error> {
    try {
      const virtualBank = (await this.virtualBankModel.findById(
        virtualBankId
      )) as VirtualBank;
      if (!virtualBank.virtualCentralAccount) {
        await this.virtualBankModel.findByIdAndUpdate(virtualBankId, {
          virtualCentralAccount: virtualAccountId,
        });
      }
      return (await this.virtualBankModel.findById(
        virtualBankId
      )) as VirtualBank;
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Get central account id
   */
  public async getVirtualCentralAccount(
    virtualBankId: ObjectId
  ): Promise<ObjectId | Error> {
    try {
      const virtualBank = (await this.virtualBankModel.findById(
        virtualBankId
      )) as VirtualBank;
      return virtualBank.virtualCentralAccount;
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Get central fee
   */
  public async getCentralFee(virtualBankId: ObjectId): Promise<number | Error> {
    try {
      const virtualBank = (await this.virtualBankModel.findById(
        virtualBankId
      )) as VirtualBank;
      return virtualBank.centralFee;
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Set central fee
   */
  public async setCentralFee(
    virtualBankId: ObjectId,
    centralFee: number
  ): Promise<VirtualBank | Error> {
    try {
      await this.virtualBankModel.findByIdAndUpdate(virtualBankId, {
        centralFee: centralFee,
      });
      return (await this.virtualBankModel.findById(
        virtualBankId
      )) as VirtualBank;
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Get user starting balance
   */
  public async geUserStartingBalance(
    virtualBankId: ObjectId
  ): Promise<number | Error> {
    try {
      const virtualBank = (await this.virtualBankModel.findById(
        virtualBankId
      )) as VirtualBank;
      return virtualBank.userStartingBalance;
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Set user starting balance
   */
  public async setUserStartingBalance(
    virtualBankId: ObjectId,
    userStartingBalance: number
  ): Promise<VirtualBank | Error> {
    try {
      await this.virtualBankModel.findByIdAndUpdate(virtualBankId, {
        userStartingBalance: userStartingBalance,
      });
      return (await this.virtualBankModel.findById(
        virtualBankId
      )) as VirtualBank;
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }
}

export default VirtualBankService;
