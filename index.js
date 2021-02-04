require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");


const userRouter = require("./routes/user");
const productRoutes = require("./routes/product");
// const cartItemRoutes = require("./routes/cartItem");
const orderRoutes = require("./routes/order");
const adminRoutes = require("./routes/admin");

mongoose.connect(process.env.DB_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log('DB connected'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/users", userRouter);
app.use("/products", productRoutes);
// app.use("/cartItems", cartItemRoutes);
app.use("/orders", orderRoutes);
app.use("/admin",adminRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});