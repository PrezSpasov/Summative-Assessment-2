const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const resourceRoutes = require('./routes/resources');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/resources', resourceRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
