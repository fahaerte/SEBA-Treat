import { Document } from "mongoose";
import { ICreditPackage2 } from "@treat/lib-common/lib/interfaces/ICreditPackage";


interface CreditPackage extends Document, ICreditPackage2 {}

export default CreditPackage;
