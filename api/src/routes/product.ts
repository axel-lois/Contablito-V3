import { Router } from "express";
import auth from "../middleware/auth";
import {
  postProduct,
  deleteProduct,
  putProduct,
  getProducts,
  getProduct
} from "../controllers/product";

const productRouter: Router = Router();

productRouter.post("/createProduct",auth, postProduct);

productRouter.put("/putProduct/:id",auth, putProduct);

productRouter.delete("/deleteProduct/:id",auth, deleteProduct);

productRouter.get('/getProduct/:id',auth,getProduct)

productRouter.get("/getProducts",auth, getProducts);

export default productRouter;
