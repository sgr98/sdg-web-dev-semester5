const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema for storing users in Database
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    register_date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = User = mongoose.model('user', UserSchema);
