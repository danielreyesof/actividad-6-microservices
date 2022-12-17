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
exports.checkRolesExisted = exports.checkDuplicatedUsernameOrEmail = void 0;
const Role_1 = require("../models/Role");
const User_1 = __importDefault(require("../models/User"));
const checkDuplicatedUsernameOrEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username: req.body.username });
    if (user)
        return res.status(400).json({ status: 400, message: `The username already exists` });
    const email = yield User_1.default.findOne({ email: req.body.email });
    if (email)
        return res.status(400).json({ status: 400, message: `The email already exists` });
    next();
});
exports.checkDuplicatedUsernameOrEmail = checkDuplicatedUsernameOrEmail;
const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            const element = req.body.roles[i];
            if (!Role_1.ROLES.includes(element)) {
                return res.status(400).json({
                    message: `Role ${element} does not exists`,
                });
            }
        }
    }
    next();
};
exports.checkRolesExisted = checkRolesExisted;
