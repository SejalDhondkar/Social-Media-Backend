const Post = require("../models/Post");

module.exports = {
    addPost: async (req,res) => {
        // TODO: Add validation
        const userId = req.user.id;
        const {title, description } = req.body;

        if(!title || !description) return res.status(400).send("Incomplete Data");

        const post = await Post.create({ ...req.body, user: userId});

        return res.status(200).json(post); 
    },

    deletePost: async (req, res) => {
        const userId = req.user.id;
        const postId = req.params.id;

        const post = await Post.findById(postId);

        // check if post exists
        if(!post) return res.status(404).send("Post not found");

        // check if post belongs to the user
        if(!post.user.equals(userId)) return res.status(401).send("You are not allowed to delete this post");

        const deletePost = await Post.findByIdAndDelete(postId);

        return res.status(200).send("Post deleted Successfully");
    },

    getPost: async (req, res) => {
        const userId = req.user.id;
        const postId = req.params.id;

        const post = await Post.findById(postId).populate('comments').populate('likes_count');

        // check if post exists
        if(!post) return res.status(404).send("Post not found");

        return res.status(200).json(post);
    },

    getAllPosts: async (req,res) => {
        const userId = req.user.id;

        const posts = await Post.find({user: userId}).populate('comments').populate('likes_count');

        return res.status(200).json(posts);
    }
}