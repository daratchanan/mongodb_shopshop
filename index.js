require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const cors = require('cors');
// const productRouter = require('./routes/product');
// const userRouter = require('./routes/user');


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

// app.use('/product', productRouter);
// app.use('/', userRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});