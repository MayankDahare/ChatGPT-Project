require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const initializeSocketServer = require('./src/sockets/socket.server');
const httpServer = require('http').createServer(app) ;


// Connect to the database
connectDB();
// Initialize Socket Server
initializeSocketServer(httpServer);




httpServer.listen(4000, () => {
  console.log('Server is running on port 4000');
}); 