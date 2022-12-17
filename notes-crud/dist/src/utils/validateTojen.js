"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const options = {
    hostname: 'https://act6micro.up.railway.app',
    path: '/api/auth/verifytoken',
    method: 'POST',
    headers: {},
};
const makeCall = (token) => {
    if (token === null)
        throw new Error('No token provided');
    options.headers = { Authorization: token };
    return new Promise((resolve, reject) => {
        const req = http_1.default.request(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (d) => {
                resolve(JSON.parse(d));
            });
        });
        req.on('error', (e) => {
            reject(e);
        });
        req.end();
    });
};
exports.default = makeCall;
