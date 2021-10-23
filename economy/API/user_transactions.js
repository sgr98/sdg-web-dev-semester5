const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/User_Transaction');

// //////////////////////////////////////////////////////
// USER /dashboard/:userId/
// //////////////////////////////////////////////////////

// @route   GET Posts
// @desc    Get posts for a user
// @access  Private
router.get('/:userId/budgeter', async (req, res) => {
    try {
        const { userId } = req.params;
        const user_post = await User.findById(userId);
        res.json({ posts: user_post.user_economy });
    } catch (err) {
        console.log(
            "Server Problem while getting a user post. Check GET budgeter in 'API/user_transactions.js'"
        );
        res.status(404).json({ success: false });
    }
});

// @route   CREATE 
// @desc    Create user space in user_transactions db with empth user_economy
// @access  Private

// @route   GET Posts
// @desc    Get posts for a user
// @access  Private
router.get('/:userId/graph', async (req, res) => {
    try {
        const { userId } = req.params;
        const user_post = await User.findById(userId);
        res.json({ posts: user_post.user_economy });
    } catch (err) {
        console.log(
            "Server Problem while geting a user post. Check GET graph in 'API/user_transactions.js'"
        );
        res.status(404).json({ success: false });
    }
});

module.exports = router;
