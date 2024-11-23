const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Submit a Review
router.post('/submit', (req, res) => {
    const { resourceId, userId, rating, review } = req.body;
    const sql = 'INSERT INTO reviews (resource_id, user_id, rating, review) VALUES (?, ?, ?, ?)';
    db.query(sql, [resourceId, userId, rating, review], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Review submitted successfully!' });
    });
});

// Upvote a Review
router.post('/upvote', (req, res) => {
    const { reviewId } = req.body;
    const sql = 'UPDATE reviews SET upvotes = upvotes + 1 WHERE id = ?';
    db.query(sql, [reviewId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Upvote added!' });
    });
});

module.exports = router;
