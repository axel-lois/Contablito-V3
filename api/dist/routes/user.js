"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const auth_1 = __importDefault(require("../middleware/auth"));
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", user_1.signUp);
userRouter.post("/signin", user_1.signIn);
userRouter.get("/profile", auth_1.default, user_1.profile);
userRouter.delete('/logout', auth_1.default, user_1.logOut);
exports.default = userRouter;
//# sourceMappingURL=user.js.map