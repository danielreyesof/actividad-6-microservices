"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    host_name: process.env.DBCONNECT,
    secret: process.env.JWT_TOKEN_SECRET,
};
