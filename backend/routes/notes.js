const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');

// ROUTE1 - Get all user notes using GET "/app/notes/fetchallnotes" [Login required]
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({user : req.user.id});
    console.log("notes = ", notes);
    res.json({notes})
});

module.exports = router;