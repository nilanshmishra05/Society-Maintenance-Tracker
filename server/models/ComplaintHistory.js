const mongoose=require("mongoose");

const historySchema=new mongoose.Schema({

complaint:{
type:mongoose.Schema.Types.ObjectId,
ref:"Complaint",
required:true
},

status:{
type:String,
required:true
},

actor:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

note:{
type:String,
default:""
}

},
{
timestamps:true
});

module.exports=mongoose.model("ComplaintHistory",historySchema);