const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const workflowsRouter = require('./routes/workflows');


// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);


// Initialize Socket.io
const io = socketio(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/los', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Middleware configuration
app.use(cors());
app.use(bodyParser.json());
app.use('/workflows', workflowsRouter);
app.set('io', io);


// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(403).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalid' });
    req.user = user;
    next();
  });
};


// Example route (you will expand these)
app.get('/', (req, res) => {
  res.send('Process Flow Creator API is running!');
});


// Integrate Socket.io events (for real-time updates)
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Export app for testing purposes if needed
module.exports = app;
