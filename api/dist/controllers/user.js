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
exports.profile = exports.logOut = exports.signUp = exports.signIn = void 0;
const User_1 = __importDefault(require("../models/User"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            throw new Error("Email or password is wrong.");
        }
        const isMatch = yield user.validatePassword(password);
        if (!isMatch) {
            throw new Error("Invalid password.");
        }
        const token = yield user.generateAuthToken();
        res
            .header("auth-token", token)
            .send({ successMsg: "You signed in successfully." });
    }
    catch (error) {
        res.status(400).send({ error, errorMsg: error.message });
    }
});
exports.signIn = signIn;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        const emailAlreadyExists = yield User_1.default.findOne({ email });
        if (emailAlreadyExists) {
            throw new Error("Email already exists.");
        }
        const usernameAlreadyExists = yield User_1.default.findOne({ username });
        if (usernameAlreadyExists) {
            throw new Error("Username already exists.");
        }
        const user = new User_1.default({
            username,
            email,
            password,
        });
        user.password = yield user.encryptPassword(user.password);
        const token = yield user.generateAuthToken();
        yield user.save();
        res
            .header("auth-token", token)
            .status(201)
            .send({ successMsg: "User created successfully" });
    }
    catch (error) {
        res.status(400).send({ error, errorMsg: error.message });
    }
});
exports.signUp = signUp;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userID);
        yield user.deleteAuthToken(req.token);
        res.send({ successMsg: "You logged out successfully." });
    }
    catch (error) {
        res.status(400).send({ error, errorMsg: error.message });
    }
});
exports.logOut = logOut;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userID);
        if (!user) {
            throw new Error("Oops! the user does not exist.");
        }
        const username = user.username;
        res.send({ successMsg: "Here is your user info.", username });
    }
    catch (error) {
        res.status(400).send({ error, errorMsg: error.message });
    }
});
exports.profile = profile;
//# sourceMappingURL=user.js.map