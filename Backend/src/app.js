const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// routes
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');

const app = express();

// CORS for production + local
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://chatgpt-project-rqr8.onrender.com'
    ],
    credentials: true,
}));

// middlewares
app.use(express.json());
app.use(cookieParser());

// serve frontend
app.use(express.static(path.join(__dirname, '../public')));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// fallback for react/vite routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
