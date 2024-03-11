const mongoose= require("mongoose")
const RatingSchema= mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', 
        required: true,
      },
    rating :{
        type:Number
    }
})
//create model
const Rating= mongoose.model("Rating", RatingSchema)
module.exports= Rating