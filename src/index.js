const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const budgetRoutes = require('./routes/budgets');
const reportRoutes = require('./routes/reports');
const tasksRoute = require('./routes/tasks');
const membersRoute = require('./routes/members');
const analyticsRoute = require('./routes/analytics');

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());

// Make socket accessible in routes
app.set('io', io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/tasks', tasksRoute);
app.use('/api/members', membersRoute);
app.use('/api/reports/analytics', analyticsRoute);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server listening on', PORT));

// Socket connection
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
});
