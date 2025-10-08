import express from "express";
import {
  addProductHandler,
  deleteProductByIdHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductByIdHandler,
} from "../handlers/producthandler.js";

const productRouter = express.Router();

productRouter.get("/product", getAllProductsHandler);
productRouter.post("/product", addProductHandler);
productRouter.get("/product/:id", getProductByIdHandler);
productRouter.put("/product/:id", updateProductByIdHandler);
productRouter.delete("/product/:id", deleteProductByIdHandler);

export default productRouter;
