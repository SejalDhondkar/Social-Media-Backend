const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
    user: {    
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User'                             
    },
    follows: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User'
    }
});

module.exports = mongoose.model('Follow', FollowSchema);