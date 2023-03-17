const Follow = require("../models/Follow");
const User = require("../models/User");

module.exports = {
    follow: async (req,res) => {
        const userId = req.user.id;
        const followId = req.params.id;

        const data = await Follow.findOne({user: userId, follows: followId});
        if(data) return res.status(401).send("Already following");

        const followData = await Follow.create({user: userId, follows: followId});

        // Update follower and following counts
        // const user = User.findByIdAndUpdate({userId},{ $inc: {following_count: 1}});
        // const follow = User.findByIdAndUpdate({followId}, { $inc:  {follower_count: 1}});

        return res.status(200).send("Followed successfully");
    },

    unfollow: async (req,res) => {
        const userId = req.user.id;
        const followId = req.params.id;

        const data = await Follow.findOne({user: userId, follows: followId});
        if(!data) return res.status(401).send("Invalid request");

        const unfollow = await Follow.findOneAndDelete({user: userId, follows: followId});

        // Update follower and following counts
        // const user = User.findByIdAndUpdate({userId},{ $inc: {following_count: -1}});
        // const follow = User.findByIdAndUpdate({followId}, { $inc:  {follower_count: -1}});

        return res.status(200).send("Unfollowed successfully");
    }
}