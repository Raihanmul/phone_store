import { pool } from "../config/db.js";

// Get all products (tampilkan semua kolom, tidak ada penyembunyian data)
export const getAllProductsHandler = async (req, res) => {
  try {
    const [products] = await pool.query("SELECT * FROM products");

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get product by ID (tampilkan semua kolom)
export const getProductByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const [products] = await pool.query("SELECT * FROM products WHERE id=?", [
      id,
    ]);

    if (products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: products[0],
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Add new product (tampilkan semua kolom pada response)
export const addProductHandler = async (req, res) => {
  const { user_id, name, description, price, stock } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Name is required",
    });
  }

  if (!description || !description.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Description is required",
    });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO products (user_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
      [user_id, name, description, price, stock]
    );

    // Ambil data lengkap produk yang baru ditambahkan
    const [newProductRows] = await pool.query(
      "SELECT * FROM products WHERE id=?",
      [result.insertId]
    );

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: newProductRows[0],
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Update product by ID (tampilkan semua kolom pada response)
export const updateProductByIdHandler = async (req, res) => {
  const { id } = req.params;
  const { user_id, name, description, price, stock } = req.body;

  try {
    await pool.query(
      "UPDATE products SET user_id=?, name=?, description=?, price=?, stock=? WHERE id=?",
      [user_id, name, description, price, stock, id]
    );

    const [productUpdate] = await pool.query(
      "SELECT * FROM products WHERE id=?",
      [id]
    );

    if (productUpdate.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: productUpdate[0],
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete product by ID
export const deleteProductByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [deleteProduct] = await pool.query(
      "DELETE FROM products WHERE id=?",
      [id]
    );

    if (deleteProduct.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
