import * as ProductService from "../services/productService.js";

export const getAllProductHandler = async (req, res, next) => {
  try {
    const response = await ProductService.getAllProduct();

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await ProductService.getProductById(id);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createProductHandler = async (req, res, next) => {
  try {
    const response = await ProductService.createProduct(req.body);

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductByIdHandler = async (req, res, next) => {
  try {
    const response = await ProductService.updateProduct(req.params, req.body);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProductService.deleteProduct(id);

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
