const express = require("express");
const { randomOrderNumber } = require("../helpers/utils");
const {
  createTransactions,
  getTransactions,
} = require("../controllers/TransactionController");
const response = require("../helpers/responses");
const transactions = express.Router();

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction.
 *     description: Create a new transaction record.
 *     tags: [transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total_price:
 *                 type: number
 *                 description: Total price of the transaction.
 *                 example: 150.0
 *               paid_amount:
 *                 type: number
 *                 description: Amount paid for the transaction.
 *                 example: 150.0
 *               products:
 *                 type: array
 *                 description: List of products involved in the transaction.
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID of the product.
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the product.
 *                       example: 3
 *     responses:
 *       '201':
 *         description: Transaction created successfully.
 *       '400':
 *         description: Bad request. Invalid input.
 *       '500':
 *         description: Internal server error.
 *   get:
 *     summary: transaction fetcher
 *     tags: [transactions]
 *     responses:
 *       200:
 *         description: transaction fetched
 *       403:
 *         description: failed to fetch transaction
 */

transactions.route("/").get(async (req, res) => {
  try {
    const reslut = await getTransactions();
    response.success(reslut, "transactions fetched successfully", res);
  } catch (err) {
    response.error({ err: err.message }, req.originalUrl, 403, res);
  }
});

transactions.route("/").post(async (req, res) => {
  const { total_price, paid_amount, products } = req.body;

  const data = {
    no_order: randomOrderNumber(),
    total_price,
    paid_amount,
  };

  try {
    const reslut = await createTransactions(data, products);
    response.success(reslut, "transactions created successfully", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = transactions;
