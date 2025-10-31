import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/productValidation.js";
import validate from "../validations/validate.js";

export const getAllProduct = async () => {
  const [products] = await pool.query("SELECT * FROM products");

  return products;
};

export const getProductById = async (id) => {
  const [products] = await pool.query("SELECT * FROM products WHERE id=?", [
    id,
  ]);

  if (products.length === 0) {
    throw new ResponseError(404, "User not found");
  }

  return products[0];
};

export const createProduct = async (request) => {
  const validated = validate(createProductSchema, request);

  const { user_id, name, description, price, stock } = validated;

  const [products] = await pool.query(
    "INSERT INTO products (user_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
    [user_id, name, description, price, stock]
  );

  const [newProduct] = await pool.query("SELECT * FROM products WHERE id=?", [
    products.insertId,
  ]);

  return newProduct[0];
};

export const updateProduct = async (params, request) => {
  const validated = validate(updateProductSchema, request);

  const { id } = params;
  const { user_id, name, description, price, stock } = validated;

  await pool.query(
    "UPDATE products SET user_id=?, name=?, description=?, price=?, stock=? WHERE id=?",
    [user_id, name, description, price, stock, id]
  );

  const [productUpdate] = await pool.query(
    "SELECT * FROM products WHERE id=?",
    [id]
  );

  return productUpdate[0];
};

export const deleteProduct = async (id) => {
  const [deleteProduct] = await pool.query("DELETE FROM products WHERE id=?", [
    id,
  ]);

  if (deleteProduct.affectedRows === 0) {
    throw new ResponseError(404, "User not found");
  }

  return;
};
