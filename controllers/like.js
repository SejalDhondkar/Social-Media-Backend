const Like = require("../models/Like");
const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {
    likePost: async (req,res) => {
        const userId = req.user.id;
        const postId = req.params.id;

        const data = await Like.findOne({user: userId, post: postId});
        if(data) return res.status(401).send("Already Liked");

        const LikeData = await Like.create({user: userId, post: postId});

        // Update likes count
        // const post = Post.findByIdAndUpdate({postId},{ $inc: {likes_count: 1}});

        return res.status(200).send("Liked successfully");
    },

    unlikePost: async (req,res) => {
        const userId = req.user.id;
        const postId = req.params.id;

        const data = await Like.findOne({user: userId, post: postId});
        if(!data) return res.status(401).send("Invalid Request");

        const LikeData = await Like.findOneAndDelete({user: userId, post: postId});

        // Update likes count
        // const post = Post.findByIdAndUpdate({postId},{ $inc: {likes_count: -1}});

        return res.status(200).send("Unliked successfully");
    }
}