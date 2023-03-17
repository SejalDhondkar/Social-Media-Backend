const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {

    authenticate: async (req, res) => {
        const { email, password} = req.body;

        const userData = await User.findOne({email});

        //check if user exists
        if(!userData) return res.status(400).send("User not found!");

        //check password match
        if(password != userData.password) return res.status(400).send("Incorrect credentials");

        const data = {
            user: {
                id: userData._id,
                email: userData.email
            }
        }
        
        //generate jwt
        const authUser = jwt.sign(data, process.env.JWT_SECRET);

        return res.status(200).json(authUser);
    },

    userProfile: async (req, res) => {
        const userId = req.user.id;
        try{
            const user = await User.findById(userId).select("username").populate('follower_count').populate('following_count');
            return res.status(200).json(user);
        }catch(error){
            return res.status(500).send("Internal Server Error");
        }
    }
}