import express from "express";
import {
  createProductHandler,
  deleteProductByIdHandler,
  getAllProductHandler,
  getProductByIdHandler,
  updateProductByIdHandler,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProductHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.post("/", createProductHandler);
productRouter.put("/:id", updateProductByIdHandler);
productRouter.delete("/:id", deleteProductByIdHandler);

export default productRouter;
