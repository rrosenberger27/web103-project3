import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;
const app = express()

dotenv.config()

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'public')));

// app.use('/api/events', tshirtRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});