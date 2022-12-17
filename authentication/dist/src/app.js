"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const package_json_1 = __importDefault(require("../package.json"));
const initialSetup_1 = require("./libs/initialSetup");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
(0, initialSetup_1.createRoles)();
// Set
app.set('pkg', package_json_1.default);
// Use
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// Crud
app.get('/', (_req, res) => {
    res.json({
        project_name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    });
});
app.use('/api/auth/', auth_routes_1.default);
exports.default = app;
