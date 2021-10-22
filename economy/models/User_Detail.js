const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Details Schema for storing user row inputs in Database
const UserDetailsSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_economy: {
        // Put Array here
        
        // type: String,
        // required: true,
        // unique: true
    },
});

module.exports = UserDetails = mongoose.model('user_detail', UserDetailsSchema);
