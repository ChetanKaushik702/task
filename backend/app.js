const express = require("express");
const cookieParser = require("cookie-parser");

// error middleware
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(cookieParser());

// routes
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");

app.use("/api/v1/product", product);
app.use("/api/v1/user", user);

app.use(errorMiddleware);

module.exports = app;
