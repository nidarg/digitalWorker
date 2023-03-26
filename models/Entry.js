const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({

    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide a user']
    },
    title:{
        type:String,
        required:[true,'Please provide title']
    },
    description:{
        type:String,
        required:[true,'Please provide description']
    },
    image:{
        type:String,
        required:[true,"Please add an image"]
    },
    customerWebsite:{
        type:String,
        required:[true,"Please add a link to customer website"]
    }

},{timestamps:true})

module.exports = mongoose.model("Entry",EntrySchema)