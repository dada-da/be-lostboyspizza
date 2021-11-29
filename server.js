import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

dotenv.config();

const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/lostboyspizza',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({ msg: 'This has CORS enabled 🎈' });
});

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
