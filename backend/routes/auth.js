const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//create user using POST : /api/auth/
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min:3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min:5 })
], async (req, res) => {
    try {
        //I there are errors, return bad request and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.array());
            return res.status(400).json({errors : errors.array() });
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
                    .json({"error": "Sorry a user with this email already exists."});
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

        res.send({"msg":"user created successfully..!!", user});
    
    }catch(err) {
        console.error("err = ", err);
        res.status(500).send({
                "msg":"Some error occured",
                "error": error.message
        });
    }
});

module.exports = router;