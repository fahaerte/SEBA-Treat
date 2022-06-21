import { Document, ObjectId } from "mongoose";

export default interface Rating extends Document {
  authorId: ObjectId;
  receiverId: ObjectId;
  stars: number;
}
