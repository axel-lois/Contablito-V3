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
exports.getProduct = exports.getProducts = exports.deleteProduct = exports.putProduct = exports.postProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, stock, minStock, price } = req.body;
        const product = new Product_1.default({
            name,
            description,
            stock,
            minStock,
            price,
            owner: req.userID,
        });
        yield product.save();
        res.send({ successMsg: "Product created successfully" });
    }
    catch (error) {
        res.status(400).send({ error, errorMsg: error.message });
    }
});
exports.postProduct = postProduct;
const putProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, stock, minStock, price } = req.body;
        const product = yield Product_1.default.findOneAndUpdate({ _id: req.params.id, owner: req.userID }, {
            name,
            description,
            stock,
            minStock,
            price,
        });
        if (!product) {
            throw new Error("Product not found.");
        }
        res.send({ successMsg: "Product updated successfully." });
    }
    catch (error) {
        res.status(400).send({ error, errorMsg: error.message });
    }
});
exports.putProduct = putProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findOneAndDelete({
            owner: req.userID,
            _id: req.params.id,
        });
        if (!product) {
            throw new Error("Product not found.");
        }
        res.send({ successMsg: "Product deleted successfully." });
    }
    catch (error) {
        res.status(400).send({ error, errorMsg: error.message });
    }
});
exports.deleteProduct = deleteProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find({ owner: req.userID });
        if (products.length === 0) {
            throw new Error("No products were found.");
        }
        res.send(products);
    }
    catch (error) {
        res.status(400).send({ error, errorMsg: error.message });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findById({
            _id: req.params.id,
            owner: req.userID,
        });
        if (!product) {
            throw new Error("Product not found.");
        }
        res.send({ successMsg: "Here is your product.", product });
    }
    catch (error) {
        res.status(400).send({ error, errorMsg: error.message });
    }
});
exports.getProduct = getProduct;
//# sourceMappingURL=product.js.map