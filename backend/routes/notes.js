const express=require('express')
const router=express.Router()
const fetchuser=require("../middleware/fetchuser")
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

//ROUTE 1: Fetch all notes details : GET "/api/notes/fetchallnotes" : Login Required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes=await Note.find({user:req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE 2: ADD notes details : POST "/api/notes/addnote" : Login Required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must with atleast 5 characters').isLength({ min: 5 })
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title,description,tag}=req.body;
        //create a new Note with model
        note=new Note({
            title,description,tag,user:req.user.id
        }) 
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
    
})

//ROUTE 3: Update an existing Note details by : PUT "/api/notes/updatenote" : Login Required
router.put('/updatenote/:id',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must with atleast 5 characters').isLength({ min: 5 })
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title,description,tag}=req.body;
        //create a newNote object
        const newNote={}
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}

        //find a note that need to be updated and update it
        const note=await Note.findById(req.params.id)
        //Check whether the note exists or not
        if(!note){
           return res.status(404).send("Not Found")
        }
        //check the same user which have created that note able to update it
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Authorised")
        }
        noteUpdated=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new :true})
        // noteUpdated=await Note.findByIdAndUpdate(req.params.id,newNote,{new :true})
        res.json(noteUpdated)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
    
})

//ROUTE 4: Delete Note details by: Delete "/api/notes/deletenote" : Login Required
router.delete('/deletenote/:id',fetchuser,
async (req,res)=>{
    try {
        //find a note that need to be delete and delete it
        const note=await Note.findById(req.params.id)
        //Check whether the note exists or not
        if(!note){
           return res.status(404).send("Not Found")
        }
        //check the same user which have created that note able to Delete it
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Authorised")
        }
        noteDeleted=await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted"})

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
    
})
module.exports=router