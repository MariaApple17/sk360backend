import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//ari ipang import ang routes
import authRoutes from './src/routes/auth.routes.js';

import pool from './src/db.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

async function checkDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

async function startServer() {
  if (!(await checkDatabaseConnection())) {
    console.error('Failed to connect to database. Server will not start.');
    process.exit(1);
  }

  //gamiton ang routes endpoints
  app.use('/api/auth', authRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
}

// Start the server
startServer();