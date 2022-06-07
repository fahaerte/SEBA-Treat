import { Document } from "mongoose";

export interface IMealCategory extends Document {
  id: string;
  label: string;
}
