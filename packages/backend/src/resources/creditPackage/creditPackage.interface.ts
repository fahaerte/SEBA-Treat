import { Document } from "mongoose";
// import { ICreditPackage } from "@treat/lib-common/src/interfaces/ICreditPackage";
import { ICreditPackage2 } from "@treat/lib-common/lib/interfaces/ICreditPackage";
// import { ICreditPackageLegacy } from "@treat/lib-common/src/interfaces/ICreditPackage";

// interface CreditPackage extends Document, ICreditPackageLegacy {}
interface CreditPackage extends Document, ICreditPackage2 {}

export default CreditPackage;
