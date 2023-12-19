const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const port = 3000;

const swaggerDefinition = {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "POS-SERVER API Documentation",
    description: "POS-SERVER API Documentation For Perople",
    contact: {
      name: "Ahmad Ramadani",
      email: "ahmadrammadanii@gmail.com",
      url: "https://github.com/Ramadani-coding",
    },
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: `Development server running on port ${port}`,
    },
    {
      url: `https://api-pos.cyclic.cloud/docs`,
      description: `Production server`,
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./routers/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(bodyParser.json());
app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("API ready to use 🔥🔥");
});

const products = require("./routers/product");
const transactions = require("./routers/transaction");

app.use("/products", products);
app.use("/transactions", transactions);

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`);
});
