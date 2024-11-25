const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

// Register User
router.post('/register', async (req, res) => {
    const { fullName, email, phone, password, interests } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (full_name, email, phone, password, interests) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [fullName, email, phone, hashedPassword, interests], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// Login User
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    });
});

module.exports = router;
