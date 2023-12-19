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
