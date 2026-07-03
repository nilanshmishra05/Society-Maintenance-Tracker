const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
{
    resident:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    category:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    photo:{
        type:String,
        default:""
    },

    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Low"
    },

    status:{
        type:String,
        enum:["Open","In Progress","Resolved"],
        default:"Open"
    },

    isOverdue:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

module.exports=mongoose.model("Complaint",complaintSchema);