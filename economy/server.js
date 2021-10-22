const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Express Parser Middleware
app.use(express.json());

// DB Config
// Extracting the value of mongoURI from ./config/default.json
const dbURI = config.get('mongoURI');

// Connect to Mongo
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.log('Error Detected');
        console.log(err);
    }
};
connectDB();

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
