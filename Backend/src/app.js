const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// routes
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');



const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// uaing middlewares 
app.use(express.json());
app.use(cookieParser());

// using routes 
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.get('*name', (req, res) => {
    res.sendFile(path.json(__dirname, '../public/index.html'));
});

module.exports = app;