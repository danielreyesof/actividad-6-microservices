"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logout = exports.signin = exports.signup = void 0;
const User_1 = __importStar(require("../models/User"));
const Role_1 = __importDefault(require("../models/Role"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const BlacklistToken_1 = __importDefault(require("../models/BlacklistToken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, email_verified_at, password, imgURL, platform, push_token, roles } = req.body;
    const newUser = new User_1.default({
        name,
        username,
        email,
        email_verified_at,
        imgURL,
        platform,
        push_token,
        password: yield (0, User_1.encryptPassword)(password),
    });
    if (roles) {
        const foundRoles = yield Role_1.default.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((role) => role._id);
    }
    else {
        const role = yield Role_1.default.findOne({ name: 'user' });
        newUser.roles = [role._id];
    }
    const savedUser = yield newUser.save();
    const token = jsonwebtoken_1.default.sign({ id: savedUser._id }, config_1.default.secret, {
        expiresIn: 86400,
    });
    res.status(200).json({ status: 201, token });
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield User_1.default.findOne({ email: req.body.email }).populate('roles');
    if (!userFound)
        return res.status(400).json({ message: 'Incorrect email or password' });
    const matchPassword = yield (0, User_1.comparePassword)(req.body.password, userFound.password);
    if (!matchPassword)
        return res.status(401).json({ token: null, message: 'Incorrect email or password' });
    const token = jsonwebtoken_1.default.sign({ id: userFound._id }, config_1.default.secret, {
        expiresIn: 86400,
    });
    res.status(200).json({ status: 200, token });
});
exports.signin = signin;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    const newBlToken = new BlacklistToken_1.default({
        token,
    });
    yield newBlToken.save();
    res.status(200).json({ status: 200, message: 'Session ended' });
});
exports.logout = logout;
