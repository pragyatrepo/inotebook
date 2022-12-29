//exporting mongoose
const mongoose=require('mongoose');
//mongodb databse uri
const mongoURI="mongodb+srv://root:root@cluster0.vlrvtga.mongodb.net/pragyat"
//defining connect via mongoose function
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully");
    })
}
//exporting connect function
module.exports=connectToMongo;