const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Transactions Objects to be put into the array.
const UserEconomySchema = new Schema( {
    group: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

// User Transactions Details Schema for storing user row inputs in Database
const UserTransactionSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_economy: [UserEconomySchema],
});

module.exports = UserTransaction = mongoose.model('user_transaction', UserTransactionSchema);
