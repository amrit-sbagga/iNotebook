const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = require('../keys').JWT_SECRET;
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// ROUTE1 - create user using POST : /api/auth/
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min:3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min:5 })
], async (req, res) => {
    let success = false;
    try {
        //I there are errors, return bad request and the errors
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            console.log(errors.array());
            return res.status(400).json({success, errors : errors.array() });
        }
        //console.log("body = ", req.body);
        //const user = User(req.body);
        //user.save();

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);
        
        //check whether user email already exists
        let user = await User.findOne({email : req.body.email});
        console.log("user = ", user);
        if(user){
            console.log("user email already exists..!!");
            return res.status(400)
                    .json({success, "error": "Sorry a user with this email already exists."});
        }
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password: secPass
        });
        
        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err)
        //     res.json({ 
        //         //"error" : "Please enter unique email",
        //         'message' : err.message})
        // })

        const data = {
            user : {
                id : user._id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log("jwtData = ", authToken);
        success = true
        res.send({success, authToken});
    
    }catch(err) {
        console.error("err = ", err);
        res.status(500).send({
                "msg":"Some error occured"
                //"error": error.message
        });
    }
});

// ROUTE2 - Authenticate a user using POST "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    try {
        //I there are errors, return bad request and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.array());
            return res.status(400).json({errors : errors.array() });
        }

        const { email, password } = req.body;
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ "success" : false, error : "Please try to login with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password);
        //console.log("pwdCompare = ", pwdCompare);
        if(!pwdCompare){
            return res.status(400).json({ "success" : false, error : "Please try to login with correct credentials" });
        }

        const data = {
            user : {
                id : user._id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log("login jwtData = ", authToken);
        res.send({"success" : true, authToken});

    }catch(err) {
        console.error("err = ", err);
        res.status(500).send({
                "msg" : "Some error occured"
               // "error" : error.message
        });
    }

});

// ROUTE3 - Get loggedin user details using POST "/api/auth/getuser" [Login required]
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;//get from token
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({ error : "Please try to login with correct credentials" });
        };
        res.send({user});

    }catch(err) {
        console.error("err = ", err);
        res.status(500).send({
                "msg" : "Some error occured"
               // "error" : error.message
        });
    }
});


module.exports = router;