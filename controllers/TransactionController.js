const db = require("../config/connection");

exports.getTransactions = async () => {
  const query = await db.query(
    "SELECT * FROM transactions AS t INNER JOIN transaction_detail AS i ON t.no_order = i.no_order LEFT JOIN products AS p ON i.product_id = p.id"
  );

  if (!query.error) {
    let listTransactions = [],
      listDetail = [],
      lastPush = "";

    for (let index in query) {
      if (lastPush !== query[index].no_order) {
        for (let i in query) {
          if (query[i].no_order === query[index].no_order) {
            listDetail.push({
              no_order: query[i].no_order,
              product: query[i].name,
              quantity: query[i].quantity,
            });
          }
        }
        listTransactions.push({
          no_order: query[index].no_order,
          total_price: query[index].total_price,
          paid_amount: query[index].paid_amount,
          products: listDetail,
        });
        listDetail = [];
        lastPush = query[index].no_order;
      }
    }
    return { transactions: listTransactions };
  }
};

exports.createTransactions = async (data, products) => {
  const query = await db.query("INSERT INTO transactions SET ?", [data]);

  if (!query.code) {
    const transaction_detail = [];
    const product_id = [];
    const update_stock = [];

    products.map((product) => {
      transaction_detail.push([product.id, data.no_order, product.quantity]);
      product_id.push([product.id]);
    });

    await db.query(
      "INSERT INTO transaction_detail (product_id, no_order, quantity) VALUES ?",
      [transaction_detail]
    );

    const stokProducts = await db.query(
      "SELECT stock FROM products WHERE id in (?)",
      [product_id]
    );

    stokProducts.map((stokProduct, i) => {
      update_stock.push([
        transaction_detail[i][0],
        stokProduct.stock - transaction_detail[i][2],
      ]);
    });

    await db.query(
      "INSERT INTO products (id, stock) VALUES ? ON DUPLICATE KEY UPDATE stock = VALUES(stock)",
      [update_stock]
    );
  }

  const response = await db.query(
    `SELECT * FROM transactions WHERE no_order = '${data.no_order}'`
  );

  return response;
};
