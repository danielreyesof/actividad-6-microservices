"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encryptPassword = void 0;
const mongoose_1 = require("mongoose");
const generateUUID_1 = require("../utils/generateUUID");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    _id: { type: String, default: generateUUID_1.generateUUID },
    name: String,
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    email_verified_at: { type: Date, default: null },
    password: { type: String, required: true },
    imgURL: { type: String, default: null },
    status: { type: Number, default: 1 },
    platform: { type: String, default: null },
    push_token: { type: String, default: null },
    roles: [{ ref: "Role", type: mongoose_1.Schema.Types.String }],
    date_create: { type: Date, default: Date.now() },
    date_update: { type: Date, default: Date.now() },
    date_delete: { type: Date, default: null },
}, {
    versionKey: false,
    _id: false,
});
const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return yield bcryptjs_1.default.hash(password, salt);
});
exports.encryptPassword = encryptPassword;
const comparePassword = (password, recievedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, recievedPassword);
});
exports.comparePassword = comparePassword;
exports.default = (0, mongoose_1.model)("User", userSchema);
