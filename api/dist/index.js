"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const database_1 = require("./db/database"); //db connection
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
server_1.default.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    (0, database_1.connectDB)();
});
//# sourceMappingURL=index.js.map