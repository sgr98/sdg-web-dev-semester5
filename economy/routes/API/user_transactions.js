const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const adminPrivileges = require('../middleware/admin');
const auth = require('../middleware/auth');

// UserTransaction Model
const UserTransaction = require('../../models/User_Transaction');

// //////////////////////////////////////////////////////
// ADMIN /dashboard/admin/
// //////////////////////////////////////////////////////

// @route   GET /dashboard/admin/
// @desc    Get all transactions for all users
// @access  Admin
router.get('/admin', adminPrivileges, async (req, res) => {
    try {
        const userTransactions = await UserTransaction.find();
        res.json(userTransactions);
    } catch (err) {
        console.log(
            "Server Problem while fetching users. Check admin GET in 'API/user_transactions.js'"
        );
    }
});

// @route   GET /dashboard/admin/:userId
// @desc    Get all transactions for a user
// @access  Admin
router.get('/admin/:userId', adminPrivileges, async (req, res) => {
    try {
        const { userId } = req.params;
        const user_transactions = await UserTransaction.findOne({
            user_id: userId,
        });
        if (user_transactions) {
            res.json(user_transactions);
        } else {
            console.log(
                "User does not exists in records. Check admin GET one in 'API/user_transactions.js'"
            );
            res.status(404).json({ success: false });
        }
    } catch (err) {
        console.log(
            "Server Problem while getting a user post. Check admin GET one in 'API/user_transactions.js'"
        );
        res.status(500).json({ success: false });
    }
});

// //////////////////////////////////////////////////////
// USER /dashboard/:userId/
// //////////////////////////////////////////////////////

// @route   GET /dashboard/:userId/analytics
// @desc    Get Transactions for a user
// @access  Private
router.get('/:userId/analytics', auth, async (req, res) => {
    try {
        const { userId } = req.params;
        const user_transactions = await UserTransaction.findOne({
            user_id: userId,
        });
        if (user_transactions) {
            res.json(user_transactions);
        } else {
            console.log(
                "User does not exists in records. Check analytics GET one in 'API/user_transactions.js'"
            );
            res.status(404).json({ success: false });
        }
    } catch (err) {
        console.log(
            "Server Problem while getting a user post. Check admin GET one in 'API/user_transactions.js'"
        );
        res.status(500).json({ success: false });
    }
});

// @route   GET /dashboard/:userId/budgeter
// @desc    Get Transactions for a user
// @access  Private
router.get('/:userId/budgeter', auth, async (req, res) => {
    try {
        const { userId } = req.params;
        const user_transactions = await UserTransaction.findOne({
            user_id: userId,
        });
        if (user_transactions) {
            res.json(user_transactions);
        } else {
            console.log(
                "User does not exists in records. Check budgeter GET one in 'API/user_transactions.js'"
            );
            res.status(404).json({ success: false });
        }
    } catch (err) {
        console.log(
            "Server Problem while getting a user post. Check admin GET one in 'API/user_transactions.js'"
        );
        res.status(500).json({ success: false });
    }
});

// @route   PATCH POST /dashboard/:userId/budgeter
// @desc    Add a transaction to user_transactions
// @access  Private
router.patch('/:userId/budgeter', auth, async (req, res) => {
    try {
        const { group, title, description, amount } = req.body;

        const { userId } = req.params;
        const user_transactions = await UserTransaction.findOne({
            user_id: userId,
        });

        if (user_transactions) {
            const userEconomy = user_transactions.user_economy;
            userEconomy.push({
                group,
                title,
                description,
                amount,
            });
            const updated = await UserTransaction.findOneAndUpdate(
                { user_id: userId },
                { ...user_transactions, user_economy: userEconomy },
                { new: true }
            );
            res.json({ result: updated });
        } else {
            console.log(
                "User does not exists in records. Check PATCH in 'API/user_transactions.js'"
            );
            res.status(404).json({ success: false });
        }
    } catch (err) {
        console.log(
            "Server Problem while adding a user post. Check PATCH in 'API/user_transactions.js'"
        );
        res.status(500).json({ success: false });
    }
});

// @route   PATCH UPDATE /dashboard/:userId/budgeter/edit/:id
// @desc    Edit a transaction of the user
// @access  Private

// @route   PATCH DELETE /dashboard/:userId/budgeter/delete/:id
// @desc    Delete a transaction of the user
// @access  Private
router.patch('/:userId/budgeter/:type/:id', auth, async (req, res) => {
    try {
        const { group, title, description, amount } = req.body;

        const { userId, id, type } = req.params;
        const user_transactions = await UserTransaction.findOne({
            user_id: userId,
        });

        if (user_transactions) {
            let userEconomy = user_transactions.user_economy;
            const requiredID = userEconomy.findIndex((transaction) => {
                return transaction._id.toString() === id;
            });

            if (requiredID >= 0) {
                if(type === 'edit') {
                    userEconomy[requiredID] = {
                        group,
                        title,
                        description,
                        amount,
                    }
                }
                else if(type === 'delete') {
                    userEconomy.splice(requiredID, 1)
                    console.log(userEconomy)
                }
                const updated = await UserTransaction.findOneAndUpdate(
                    { user_id: userId },
                    { ...user_transactions, user_economy: userEconomy },
                    { new: true }
                );
                res.json({ result: updated });
            } else {
                console.log(
                    "Invalid transaction ID. Check PATCH UPDATE DELETE in 'API/user_transactions.js'"
                );
                res.status(404).json({ success: false });
            }
        } else {
            console.log(
                "User does not exists in records. Check PATCH UPDATE DELETE in 'API/user_transactions.js'"
            );
            res.status(404).json({ success: false });
        }
    } catch (err) {
        console.log(
            "Server Problem while adding a user post. Check PATCH UPDATE DELETE in 'API/user_transactions.js'"
        );
        res.status(500).json({ success: false });
    }
});

module.exports = router;
