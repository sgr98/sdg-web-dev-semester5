const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const adminPrivileges = require('../middleware/admin');

// User Model
const User = require('../../models/User');
// UserTransaction Model
const UserTransaction = require('../../models/User_Transaction');

// //////////////////////////////////////////////////////
// ADMIN /admin
// //////////////////////////////////////////////////////

// @route   GET /user/admin/
// @desc    Get All Users
// @access  Admin
router.get('/admin', adminPrivileges, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(
            "Server Problem while fetching users. Check GET in 'API/users.js'"
        );
        res.status(500).json({ success: false });
    }
});

// @route   POST /user/admin/
// @desc    Add a user
// @access  Admin
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
        res.status(500).json({ success: false });
    }
});

// @route   DELETE /user/admin/:id
// @desc    Delete a user
// @access  Admin
router.delete('/admin/:id', adminPrivileges, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.remove();
        res.json({ success: true });
    } catch (err) {
        console.log(
            "Server Problem while posting a user. Check DELETE in 'API/users.js'"
        );
        res.status(500).json({ success: false });
    }
});

// //////////////////////////////////////////////////////
// USER /signin /signup
// //////////////////////////////////////////////////////

// @route   POST /user/signin
// @desc    Login a user
// @access  Public
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res
                .status(404)
                .json({ msg: 'User does not exist. Error while sigining in.' });
        }

        let isPasswordCorrect = false;
        isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordCorrect) {
            console.log("Incorrect Passowrd");
            return res.status(404).json({ msg: 'Invalid Credentials.' });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({
            msg: "Something went wrong. Check SIGNIN in 'API/users.js'",
        });
    }
});

// @route   POST /user/signup
// @desc    Add a user
// @access  Public
router.post('/signup', async (req, res) => {
    const { firstName, lastName, userName, email, password, confirmPassword } =
        req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: 'User already exists. Error while sigining up.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: 'Password does not match.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            username: userName,
            email,
            password: hashedPassword,
            first_name: firstName,
            last_name: lastName,
        });

        // Create user_economy space in user_transactions db
        await UserTransaction.create({
            user_id: result._id,
            user_economy: []
        });

        const token = jwt.sign(
            { email: result.email, id: result._id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );

        res.status(200).json({ result, token });
    } catch (err) {
        res.status(500).json({
            msg: "Something went wrong. Check SIGNUP in 'API/users.js'",
        });
    }
});

module.exports = router;
