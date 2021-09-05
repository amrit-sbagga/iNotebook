const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// ROUTE1 - Get all user notes using GET "/api/notes/fetchallnotes" [Login required]
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user : req.user.id});
        //console.log("notes = ", notes);
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

// ROUTE3 - Update an existing Note using PUT "/api/notes/updatenote" [Login required]
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {    
        const { title, description, tag } = req.body;
        const newNote = {
            updatedDate : Date.now()
        };
        if(title){ newNote.title = title};
        if(description){ newNote.description = description};
        if(tag){ newNote.tag = tag};

        //find the note to be updated & update it
        let note = await Notes.findById(req.params.id);
        if(!note){
            console.log("not found..!!");
            return res.status(404).send("Not Found.");
        }

        //only loggedin user can update his/her note
        if(note.user.toString() !== req.user.id){
            console.log("diff user not allowed..!!");
            return res.status(401).send("Not Allowed.")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, 
            { $set: newNote}, {new:true});
        res.json({note});

    }catch(err) {
        console.error("err = ", err);
        res.status(500).send({
                "msg":"Some error occured"
                //"error": error.message
        });
    }
});

// ROUTE4 - Delete an existing Note using DELETE "/api/notes/deletenote" [Login required]
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try { 
        //find the note to be deleted(if exists) & delete it
        let note = await Notes.findById(req.params.id);
        if(!note){
            console.log("not found for delete..!!");
            return res.status(404).send("Not Found.");
        }

        //only loggedin user can delete his/her note
        if(note.user.toString() !== req.user.id){
            console.log("diff user not allowed..!!");
            return res.status(401).send("Not Allowed.")
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"msg" : "Success! Note has been deleted.", note});

    }catch(err) {
        console.error("err = ", err);
        res.status(500).send({
                "msg":"Some error occured"
                //"error": error.message
        });
    }
});


module.exports = router;