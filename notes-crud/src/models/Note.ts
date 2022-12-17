import { Schema, model } from "mongoose";
import generateUUID from "../utils/generateUUID";

const noteSchema = new Schema(
  {
    _id: { type: String, required: true, default: generateUUID },
    title: String,
    content: String,
    status: { type: Number, default: 1 },
    date_create: { type: Date, default: Date.now() },
    date_update: { type: Date, default: Date.now() },
    date_delete: { type: Date, default: null },
    user_create: { type: String, required: true },
    user_update: { type: String, required: true },
    user_delete: { type: Date, default: null },
  },
  {
    versionKey: false,
    _id: false,
  }
);

export default model("Note", noteSchema);
