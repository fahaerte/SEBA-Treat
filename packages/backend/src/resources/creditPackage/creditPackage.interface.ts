import { Document } from "mongoose";
import { ICreditPackage } from "@treat/lib-common/src/interfaces/ICreditPackage";

interface CreditPackage extends Document, ICreditPackage {}

export default CreditPackage;
