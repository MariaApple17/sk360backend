import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//ari ipang import ang routes
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

//gamiton ang routes endpoints
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});