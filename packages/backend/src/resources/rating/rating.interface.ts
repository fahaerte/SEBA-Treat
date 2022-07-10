import { Document } from "mongoose";

export interface Rating {
  buyerRating?: number;
  sellerRating?: number;
}

export interface RatingDocument extends Rating, Document {}
