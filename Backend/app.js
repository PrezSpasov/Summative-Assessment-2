const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resources');
const reviewRoutes = require('./routes/reviews');

// Routes
app.use('/auth', authRoutes);
app.use('/resources', resourceRoutes);
app.use('/reviews', reviewRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
