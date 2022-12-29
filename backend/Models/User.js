const mongoose = require('mongoose');
const{Schema}=mongoose;
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
   
    date:{
        type:Date,
        default:Date.now
    }
  });
    //this will create collection name 'User' in database
    const user=mongoose.model('User',UserSchema);
    //this will export user module
    module.exports= user