const mongoose = require('mongoose');
const{Schema}=mongoose;
const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
  });
  //this will create collection name "Notes"
  const Notes=mongoose.model('Notes',NotesSchema);
  //this will export Notes module
  module.exports=Notes;