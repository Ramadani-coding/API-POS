const db = require("../config/connection");

exports.getProducts = async () => {
  return await db.query("SELECT * FROM products");
};

exports.showProducts = async (req) => {
  return await db.query(`SELECT * FROM products WHERE id = ${req.params.id}`);
};

exports.editProduct = async (data, req) => {
  return await db.query(`UPDATE products SET ? WHERE id = ${req.params.id}`, [
    data,
  ]);
};

exports.createProduct = async (data) => {
  return await db.query("INSERT INTO products SET ?", [data]);
};

exports.dropProduct = async (req) => {
  return await db.query(`DELETE FROM products WHERE id = ${req.params.id}`);
};
