const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const adminPrivileges = require('../middleware/admin')

// User Model
const User = require('../models/User');

// //////////////////////////////////////////////////////
// ADMIN /admin
// //////////////////////////////////////////////////////

// @route   Get admin
// @desc    Get All Users
// @access  Public
router.get('/admin', adminPrivileges, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(
            "Server Problem while fetching users. Check GET in 'API/users.js'"
        );
    }
});

// @route   POST admin
// @desc    Add a user
// @access  Public
router.post('/admin', adminPrivileges, async (req, res) => {
    const { username, email, password, first_name, last_name } = req.body;

    // Simple Validation
    if (!username || !email || !password || !first_name || !last_name) {
        console.log('Enter all fields');
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Checking for existing user
    const user = await User.findOne({ email });
    if (user) {
        console.log('User already exists');
        return res.status(400).json({ msg: 'User already Exists' });
    }

    // Create the user
    const newUser = new User({
        username,
        email,
        password,
        first_name,
        last_name,
    });

    // Encrypt the password and add the user
    try {
        bcrypt.genSalt(10, (err, salt) => {
            // 10 is the number of rounds, higher = securer = slower
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                const usr = await newUser.save();
                res.json({ msg: 'User added successfully' });
            });
        });
    } catch (err) {
        console.log(
            "Server Problem while posting a user. Check POST in 'API/users.js'"
        );
    }
});

// @route   DELETE admin
// @desc    Delete a user
// @access  Public
router.delete('/admin/:id', adminPrivileges, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.remove();
        res.json({ success: true });
    } catch (err) {
        console.log(
            "Server Problem while posting a user. Check DELETE in 'API/users.js'"
        );
        res.status(404).json({ success: false });
    }
});

// //////////////////////////////////////////////////////
// USER /signin /login
// //////////////////////////////////////////////////////

module.exports = router;
