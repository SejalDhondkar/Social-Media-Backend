const router = require("express").Router();
const currentUser = require("./middleware/currentUser");

// User routes
const user = require("./controllers/user");

router.post("/authenticate",user.authenticate);
router.get("/user",currentUser,user.userProfile);

// Post Routes
const post = require("./controllers/post");

router.post("/posts",currentUser, post.addPost);
router.delete("/posts/:id",currentUser,post.deletePost);
router.get("/posts/:id",currentUser, post.getPost);
router.get("/all-posts", currentUser, post.getAllPosts)

// Like Routes
const like = require("./controllers/like");

router.post("/like/:id", currentUser, like.likePost);
router.post("/unlike/:id", currentUser, like.unlikePost);

// Follow Routes
const follow = require("./controllers/follow");

router.post("/follow/:id", currentUser, follow.follow);
router.post("/unfollow/:id", currentUser, follow.unfollow);

// Comment Routes
const comment = require("./controllers/comment");

router.post("/comment/:id", currentUser, comment.addComment);

module.exports = router;