"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const generateUUID_1 = __importDefault(require("../utils/generateUUID"));
const noteSchema = new mongoose_1.Schema({
    _id: { type: String, required: true, default: generateUUID_1.default },
    title: String,
    content: String,
    status: { type: Number, default: 1 },
    date_create: { type: Date, default: Date.now() },
    date_update: { type: Date, default: Date.now() },
    date_delete: { type: Date, default: null },
    user_create: { type: String, required: true },
    user_update: { type: String, required: true },
    user_delete: { type: Date, default: null },
}, {
    versionKey: false,
    _id: false,
});
exports.default = (0, mongoose_1.model)("Note", noteSchema);
