const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type : String,
        default : ""
    },
    imgUrl:{
        type : String,
        required: [true, "Image URL is required"]
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true, "User is required"]
    }
})

const postModel = mongoose.model('Post', postSchema)

module.exports = postModel