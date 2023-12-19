const express = require("express");
const products = express.Router();
const {
  createProduct,
  getProducts,
} = require("../controllers/ProductController");
const response = require("../helpers/responses");

/**
 * @swagger
 * /products:
 *   get:
 *     summary: product fetcher
 *     tags: [products]
 *     responses:
 *       200:
 *         description: product fetched
 *       403:
 *         description: failed to fetch product
 */

products.route("/").get(async (req, res) => {
  try {
    const result = await getProducts();
    response.success(result, "feacted product successfully!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

products.route("/").post(async (req, res) => {
  const { name, price, stock, description, image } = req.body;

  const data = {
    name,
    price,
    stock,
    description,
    image,
  };

  try {
    const result = await createProduct(data);
    response.success(result, "created product successfully", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = products;
