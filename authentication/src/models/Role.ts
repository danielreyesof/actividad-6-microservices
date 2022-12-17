import { Schema, model } from "mongoose";
import { generateUUID } from "../utils/generateUUID";

export const ROLES = ["user", "admin", "moderator", "developer"];

const roleSchema = new Schema(
  {
    _id: { type: String, default: generateUUID },
    name: { type: String, unique: true, required: true },
    status: { type: Number, default: 1 },
    date_create: { type: Date, default: Date.now() },
    date_update: { type: Date, default: Date.now() },
    date_delete: { type: Date, default: null },
  },
  {
    versionKey: false,
    _id: false,
  }
);

export default model("Role", roleSchema);
