"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const product_1 = require("../controllers/product");
const productRouter = (0, express_1.Router)();
productRouter.post("/createProduct", auth_1.default, product_1.postProduct);
productRouter.put("/putProduct/:id", auth_1.default, product_1.putProduct);
productRouter.delete("/deleteProduct/:id", auth_1.default, product_1.deleteProduct);
productRouter.get('/getProduct/:id', auth_1.default, product_1.getProduct);
productRouter.get("/getProducts", auth_1.default, product_1.getProducts);
exports.default = productRouter;
//# sourceMappingURL=product.js.map