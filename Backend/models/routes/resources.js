const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Post a Resource
router.post('/post', (req, res) => {
    const { title, description, category, link, userId } = req.body;
    const sql = 'INSERT INTO resources (title, description, category, link, user_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, description, category, link, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Resource posted successfully!' });
    });
});

// Get All Resources
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM resources';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

module.exports = router;
