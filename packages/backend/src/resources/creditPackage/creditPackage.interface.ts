import { Document } from "mongoose";
import { ICreditPackageLegacy } from "@treat/lib-common/src/interfaces/ICreditPackage";

interface CreditPackage extends Document, ICreditPackageLegacy {}

export default CreditPackage;
