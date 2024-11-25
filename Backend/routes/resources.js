const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Create Resource
router.post('/post', (req, res) => {
    const { title, description, category, link, userId } = req.body;

    const sql = 'INSERT INTO resources (title, description, category, link, user_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, description, category, link, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Resource created successfully!' });
    });
});

module.exports = router;

// Search and Filter
router.get('/search', (req, res) => {
    const { keyword, category } = req.query;

    let sql = 'SELECT * FROM resources WHERE title LIKE ?';
    const params = [`%${keyword}%`];

    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

