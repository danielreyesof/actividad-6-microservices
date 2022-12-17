"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const generateUUID_1 = require("../utils/generateUUID");
const blTokenSchema = new mongoose_1.Schema({
    _id: { type: String, default: generateUUID_1.generateUUID },
    token: String,
    date_create: { type: Date, default: Date.now() },
}, {
    versionKey: false,
    _id: false,
});
exports.default = (0, mongoose_1.model)("BlToken", blTokenSchema);
