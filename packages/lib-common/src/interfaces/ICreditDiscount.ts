import { ICreditPackage } from "./ICreditPackage";

// Discount = temporary
export interface ICreditDiscount extends ICreditPackage {
  startDate: Date;
  endDate: Date;
}
