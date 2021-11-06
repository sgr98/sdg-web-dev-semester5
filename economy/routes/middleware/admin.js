const config = require('config')

// Middleware to check for admin
adminPrivileges = (req, res, next) => {
    const physical_password = req.header('x-admin-physical-password');

    // Check for password
    if (!physical_password)
        return res.status(401).json({ msg: 'No admin password is present.' });

    try {
        // Verify password
        if (physical_password === config.get('adminPassword')) {    //===> Change it later to system variable
            next();
        }
        else {
            return res.status(401).json({ msg: 'Admin password not correct.' });
        }
    } catch (e) {
        res.status(400).json({ msg: "Error in 'middleware/admin.js'" });
    }
};

module.exports = adminPrivileges;
