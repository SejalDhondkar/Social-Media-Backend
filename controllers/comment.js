const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
    addComment: async (req,res) => {
        const userId = req.user.id;
        const postId = req.params.id;

        const comment = req.body.comment;
        if(!comment) return res.status(400).send("Invalid request");
        
        const data = await Comment.create({user: userId, post: postId, comment});

        return res.status(200).json(data._id);
    }
}