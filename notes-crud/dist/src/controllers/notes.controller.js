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
exports.deleteNote = exports.getNoteById = exports.getNoteByUser = exports.updateNote = exports.addNote = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const validateTojen_1 = __importDefault(require("../utils/validateTojen"));
const addNote = ({ body, headers }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, message, user } = yield (0, validateTojen_1.default)(headers.authorization);
    if (status !== 200)
        return new Error(message);
    const { title, content } = body;
    const newNote = new Note_1.default({ title, content, user_create: user._id, user_update: user._id });
    const saveNote = yield newNote.save();
    res.status(200).json({ status: 201, saveNote });
});
exports.addNote = addNote;
const updateNote = ({ body, headers }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, message, user } = yield (0, validateTojen_1.default)(headers.authorization);
    if (status !== 200)
        return new Error(message);
    const { title, content } = body;
    const newNote = yield Note_1.default.findOneAndUpdate({ _id: body._id }, { title, content, user_update: user._id }, { new: true });
    res.status(200).json({ status: 201, newNote });
});
exports.updateNote = updateNote;
const getNoteByUser = ({ headers }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, message, user } = yield (0, validateTojen_1.default)(headers.authorization);
    if (status !== 200)
        return new Error(message);
    let response = yield Note_1.default.find({ user_create: user._id, status: 1 });
    res.status(200).json({ status: 201, response });
});
exports.getNoteByUser = getNoteByUser;
const getNoteById = ({ headers, params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, message } = yield (0, validateTojen_1.default)(headers.authorization);
    if (status !== 200)
        return new Error(message);
    console.log(params.id);
    let response = yield Note_1.default.find({ _id: params.id, status: 1 });
    res.status(200).json({ status: 201, response });
});
exports.getNoteById = getNoteById;
const deleteNote = ({ params, headers }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, message, user } = yield (0, validateTojen_1.default)(headers.authorization);
    if (status !== 200)
        return new Error(message);
    const deleteNote = yield Note_1.default.findByIdAndRemove(params.id);
    res.status(200).json({ status: 201, deleteNote });
});
exports.deleteNote = deleteNote;
