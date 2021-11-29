import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

dotenv.config();

const cors = require('cors');
const app = express();

app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/lostboyspizza',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, () => {
  console.log(`Serve at http://localhost:${port}`);
});
