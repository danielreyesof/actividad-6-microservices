import { Schema, model } from "mongoose";
import { generateUUID } from "../utils/generateUUID";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    _id: { type: String, default: generateUUID },
    name: String,
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    email_verified_at: { type: Date, default: null },
    password: { type: String, required: true },
    imgURL: { type: String, default: null },
    status: { type: Number, default: 1 },
    platform: { type: String, default: null },
    push_token: { type: String, default: null },
    roles: [{ ref: "Role", type: Schema.Types.String }],
    date_create: { type: Date, default: Date.now() },
    date_update: { type: Date, default: Date.now() },
    date_delete: { type: Date, default: null },
  },
  {
    versionKey: false,
    _id: false,
  }
);

export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, recievedPassword: string) => {
  return await bcrypt.compare(password, recievedPassword);
};

export default model("User", userSchema);
