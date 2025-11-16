require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const initializeSocketServer = require('./src/sockets/socket.server');
const httpServer = require('http').createServer(app);

// Connect to the database
connectDB();
// Initialize Socket Server
initializeSocketServer(httpServer);

// Render ke liye correct port handling
const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


