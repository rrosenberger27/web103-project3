import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import tshirtRouter from './routes/t-shirts.js';

dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express()

dotenv.config()

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/tshirts', tshirtRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});