const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const config = require('config');
const dotenv = require('dotenv');

// const { deleteOne } = require('./models/User');

const app = express();
dotenv.config();

// Express Parser Middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Use Routes
app.use('/user', require('./routes/API/users'))  // Add a route later
app.use('/dashboard', require('./routes/API/user_transactions'))  // Add a route later

app.get('/', (req, res) => {
    res.send("Hello to HBE API");
});

// DB Config
// Extracting the value of mongoURI from ./config/default.json
const dbURI = process.env.CONNECTION_URL;   //===> Change it later to system variable

// ES6 Promises (for enabling Mocha Testig)
mongoose.Promise = global.Promise;

// Connect to Mongo Atlas DB
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

if(process.env.NODE_ENV==="prodution"){
    app.use(express.static("client/build"));
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// Assign and listent to the port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
