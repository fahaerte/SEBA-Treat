import { model, Schema, Document } from "mongoose";
import { IRating } from "@treat/lib-common";

interface IRatingModel extends IRating, Document {}

const SRating: Schema = new Schema<IRatingModel>(
  {},
  {
    versionKey: false,
  }
);

export default model("Rating", SRating);
