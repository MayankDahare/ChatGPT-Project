require('dotenv').config();
const path = require("path");
const app = require('./src/app');
const connectDB = require('./src/db/db');
const initializeSocketServer = require('./src/sockets/socket.server');
const httpServer = require('http').createServer(app);

// Connect to the database
connectDB();

// Initialize Socket Server
initializeSocketServer(httpServer);


// ------------ ADD THIS PART (Frontend Serve Code) -------------
const publicPath = path.join(__dirname, "Backend", "public");

// Serve static React files
app.use(express.static(publicPath));

// Always return index.html for any unknown route
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
// ---------------------------------------------------------------


httpServer.listen(4000, () => {
  console.log('Server is running on port 4000');
});
