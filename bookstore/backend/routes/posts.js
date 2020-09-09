const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Post Model
const Post = require("../models/Post");

// @route   GET /posts
// @desc    Get All Posts
// @access  Public
router.get('/', (req, res) => {
    Post.getPosts((err, posts) => {
        if (err) { throw err; }
        res.json(posts);
    });
});

// @route   GET posts/:id
// @desc    Get A Product Specific Posts
// @access  Public
router.get("/:bookId", (req, res) => {
    const bookId = req.params.bookId;

    Post.getPostsByBookId(bookId, (err, posts) => {
        if (err) { throw err; }
        res.json(posts);
    });
});

// @route   POST /posts
// @desc    Create A Post
// @access  Private
router.post("/", auth, (req, res) => {
    var post = req.body;
    console.log(post);
    Post.addPost(post, (err, post) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(post);
    });
});

// @route   DELETE /posts/:id
// @desc    Delete A Post
// @access  Private
router.delete("/:id", auth, (req, res) => {
    var id = req.params.id;
    console.log(id);

    Post.removePost(id, (err, post) => {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});

module.exports = app => app.use('/posts', router);