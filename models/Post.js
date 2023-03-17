const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {    
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User'                             
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,  
    },
    // likes_count : {
    //     type: Number,
    //     default: 0
    // },
    created_at: {
        type: Date,
        default: Date.now   
    }
});

// Parent Referencing for Post and Comment Relationship (One to Many)

PostSchema.virtual('comments', {
    ref: 'Comment', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'post', // is equal to foreignField
    options: {
        select: 'comment'
    }
});

PostSchema.virtual('likes_count', {
    ref: 'Like', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'post', // is equal to foreignField
    count: true
});

 
// Set Object and Json property to true. Default is set to false
PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', PostSchema);