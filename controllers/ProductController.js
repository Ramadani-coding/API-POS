const db = require("../config/connection");

exports.getProducts = async () => {
  return await db.query("SELECT * FROM products");
};

exports.createProduct = async (data) => {
  return await db.query("INSERT INTO products SET ?", [data]);
};
