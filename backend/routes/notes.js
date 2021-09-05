const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// ROUTE1 - Get all user notes using GET "/api/notes/fetchallnotes" [Login required]
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user : req.user.id});
        console.log("notes = ", notes);
        res.json({notes});
    }catch(err) {
        console.error("err = ", err);
        res.status(500).send({
                "msg":"Some error occured"
                //"error": error.message
        });
    }
});

// ROUTE2 - Add a new Note using POST "/api/notes/addnote" [Login required]
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min:3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min:5 })
], async (req, res) => {
    try {
        //I there are errors, return bad request and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.array());
            return res.status(400).json({errors : errors.array() });
        }
        const { title, description, tag } = req.body;
        const note = new Notes({
            user : req.user.id,
            title,
            description,
            tag
        });
        const savedNote = await note.save();
        res.json({savedNote});

    }catch(err) {
        console.error("err = ", err);
        res.status(500).send({
                "msg":"Some error occured"
                //"error": error.message
        });
    }
});

module.exports = router;