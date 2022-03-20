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
exports.profile = exports.signUp = exports.signIn = void 0;
const User_1 = __importDefault(require("../models/User"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).send("Email or password is wrong.");
        }
        const isMatch = yield user.validatePassword(password);
        if (!isMatch) {
            return res.status(400).send("Invalid password.");
        }
        const token = yield user.generateAuthToken();
        res
            .header("auth-token", token)
            .send({ msg: "You signed in successfully.", token });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.signIn = signIn;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        const user = new User_1.default({
            username,
            email,
            password,
        });
        user.password = yield user.encryptPassword(user.password);
        const token = yield user.generateAuthToken();
        const savedUser = yield user.save();
        res
            .header("auth-token", token)
            .send({ message: "Usuario creado", savedUser });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.signUp = signUp;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userID);
        if (!user)
            return res.status(404).send("No existe.");
        const mappedUser = {
            username: user.username,
            email: user.email,
            password: user.password,
        };
        res.send(mappedUser);
    }
    catch (error) { }
});
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map