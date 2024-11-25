const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../models/db');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Update User Profile
router.put('/:id', upload.single('profilePhoto'), (req, res) => {
    const { id } = req.params;
    const { fullName, phone, interests } = req.body;
    const profilePhoto = req.file ? req.file.filename : null;

    const sql = 'UPDATE users SET full_name = ?, phone = ?, interests = ?, profile_photo = ? WHERE id = ?';
    db.query(sql, [fullName, phone, interests, profilePhoto, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Profile updated successfully!' });
    });
});

module.exports = router;
