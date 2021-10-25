const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        let decodedData;
        if (token) {
            decodedData = jwt.verify(token, config.get('jwtSecret'));
            req.userId = decodedData?.id;
        }
        else {
            res.status(404).json({msg: "Invalid Token"})
        }
        next();
    } catch (err) {
        console.log("Error while authenticating. Check './middleware/auth.js");
        console.log(err);
    }
};

module.exports =  auth;