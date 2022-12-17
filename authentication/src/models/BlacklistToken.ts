import { Schema, model } from "mongoose";
import { generateUUID } from "../utils/generateUUID";

const blTokenSchema = new Schema(
  {
    _id: { type: String, default: generateUUID },
    token: String,
    date_create: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
    _id: false,
  }
);

export default model("BlToken", blTokenSchema);
