const express = require('express');
const router = express.Router();
const User = require('../models/User');

//create user using POST : /api/auth/
router.post('/', (req, res) => {
    console.log("body = ", req.body);
    const user = User(req.body);
    user.save();
    res.send("user created successfully..!!");
});

module.exports = router;