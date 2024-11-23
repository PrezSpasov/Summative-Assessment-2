const express = require('express');
const router = express.Router();
const db = require('../models/db');

// User Sign-Up
router.post('/signup', (req, res) => {
    const { fullName, email, phone, profilePicture, interests } = req.body;
    const sql = 'INSERT INTO users (full_name, email, phone, profile_picture, interests) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [fullName, email, phone, profilePicture, interests], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// User Login (simplified)
router.post('/login', (req, res) => {
    const { email } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'Login successful', user: results[0] });
    });
});

module.exports = router;
