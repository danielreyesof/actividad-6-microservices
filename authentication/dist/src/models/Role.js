"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES = void 0;
const mongoose_1 = require("mongoose");
const generateUUID_1 = require("../utils/generateUUID");
exports.ROLES = ["user", "admin", "moderator", "developer"];
const roleSchema = new mongoose_1.Schema({
    _id: { type: String, default: generateUUID_1.generateUUID },
    name: { type: String, unique: true, required: true },
    status: { type: Number, default: 1 },
    date_create: { type: Date, default: Date.now() },
    date_update: { type: Date, default: Date.now() },
    date_delete: { type: Date, default: null },
}, {
    versionKey: false,
    _id: false,
});
exports.default = (0, mongoose_1.model)("Role", roleSchema);
