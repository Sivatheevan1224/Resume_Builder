import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

//Database Connection
import connectDB from './configs/db.js';
await connectDB();



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is Running ...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
