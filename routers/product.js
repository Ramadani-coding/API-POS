const express = require("express");
const products = express.Router();
const {
  createProduct,
  getProducts,
  showProducts,
  editProduct,
  dropProduct,
} = require("../controllers/ProductController");
const response = require("../helpers/responses");

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product.
 *     description: Create a new product with name, price, stock, description, and image.
 *     tags: [products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Product created successfully.
 *       403:
 *         description: failed to fetch product
 *   get:
 *     summary: product fetcher
 *     tags: [products]
 *     responses:
 *       200:
 *         description: product fetched
 *       403:
 *         description: failed to fetch product
 * /products/{id}:
 *   get:
 *     summary: Retrieve a single product.
 *     tags: [products]
 *     description: retrieve a single product.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: A single product.
 *       403:
 *         description: failed to fetch product
 *   patch:
 *     summary: Update a product.
 *     description: Update an existing product by ID.
 *     tags: [products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to update.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Product updated successfully.
 *       403:
 *         description: failed to fetch product
 *   delete:
 *     summary: Delete a product.
 *     description: Delete an existing product by ID.
 *     tags: [products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to delete.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Product deleted successfully.
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

products.route("/:id").get(async (req, res) => {
  try {
    const result = await showProducts(req);
    response.success(result, "get detail product successfully", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

products.route("/:id").patch(async (req, res) => {
  const { name, price, stock, description, image } = req.body;

  const data = {
    name,
    price,
    stock,
    description,
    image,
  };

  try {
    const result = await editProduct(data, req);
    response.success(result, "edit product successfully", res);
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

products.route("/:id").delete(async (req, res) => {
  try {
    const result = await dropProduct(req);
    response.success(result, "deleted product successfully", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = products;
