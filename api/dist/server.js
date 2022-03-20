"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
//creating server
const server = (0, express_1.default)();
//middleware
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: false }));
server.use((0, morgan_1.default)("dev"));
exports.default = server;
//# sourceMappingURL=server.js.map