"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = __importDefault(require("../routes/user"));
const product_1 = __importDefault(require("../routes/product"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const allowedOrigin = process.env.ORIGIN;
const options = {
    origin: allowedOrigin,
    methods: "GET,HEAD,PUT,POST,DELETE",
    optionsSuccessStatus: 200,
    exposedHeaders: "auth-token",
};
//creating server
const server = (0, express_1.default)();
//middleware
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: false }));
server.use((0, morgan_1.default)("dev"));
server.use((0, cors_1.default)(options));
//routes
server.use("/api/auth", user_1.default);
server.use("/products", product_1.default);
exports.default = server;
//# sourceMappingURL=server.js.map