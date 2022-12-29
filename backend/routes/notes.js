const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//route for fetching user notes
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });

        res.json(notes)
    }
    catch (error) {
        res.status(500).send("some error occured")
        console.log(error.message)
    }
});

//route for adding notes
router.post('/addnotes', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there are errors return error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save();
        res.json(savednote)

    }
    catch (error) {
        res.status(500).send("some error occured")
        console.log(error.message)
    }
});
//route for updating note
router.put('/updatenotes/:id', fetchuser,  async (req, res) => {
    try{
    let newnote={}
    const{title,description,tag}=req.body;

    //if title is present in updating body then update title
    if(title){
        newnote.title=title
    }

    //if description is present in updating body then update description
    if(description){
        newnote.description=description
    }

    //if tag is present in updating body then update tag
    if(tag){
        newnote.tag=tag
    }
    //find if notes is in database by id provided in url
    let note=await Notes.findById(req.params.id)
    //if note not found in database
    if(!note){
        return res.status(404).send("not found")
    }
    //if note found but user id is different from loggedin user id
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("unauthorised")
    }
    //updating the notes
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json(note)
}
catch(error) {
    res.status(500).send("some error occured")
    console.log(error.message)
}
});
//deleting a note
router.post('/deletenotes/:id', fetchuser, async (req, res) => {
    try{ 
        //check wheteher note exist in database
        let note= await Notes.findById(req.params.id)

        //check if note be deleted is of logged in user or other user
        if(note.user.toString()!==req.user.id){
        return res.status(401).send("another user note cannot be deleted")
    }

    //find and delete the notes
    note= await Notes.findByIdAndDelete(req.params.id)
        res.json(note)
    }
catch(error) {
    res.status(500).send("some error occured")
    console.log(error.message)
}})
module.exports = router