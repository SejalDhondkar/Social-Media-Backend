const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    // follower_count: {
    //     type: Number,
    //     default: 0
    // },
    // following_count: {
    //     type: Number,
    //     default: 0
    // }
});

UserSchema.virtual('follower_count', {
    ref: 'Follow', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'follow', // is equal to foreignField
    count: true
 });

UserSchema.virtual('following_count', {
    ref: 'Follow', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'user', // is equal to foreignField
    count: true
});
 
 // Set Object and Json property to true. Default is set to false
 UserSchema.set('toObject', { virtuals: true });
 UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);