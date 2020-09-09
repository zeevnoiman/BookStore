const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Book Model
const Book = require("../models/Book");

// @route   GET api/books
// @desc    Get All Books
// @access  Public
router.get("/", (req, res) => {
  Book.getBooks((err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// @route   POST api/books
// @desc    Create A Book
// @access  Private
router.post("/", auth, (req, res) => {
  var book = req.body.body;
  console.log(book);
  Book.addBook(book, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

// @route   DELETE api/books/:id
// @desc    Delete A Book
// @access  Private
router.delete("/:id", auth, (req, res) => {
  var id = req.params.id;
  console.log(id);

  Book.removeBook(id, (err, book) => {
    if (err) {
      throw err;
      // res.status(404).json({ success: false });
    }
    res.json(book);
    // res.json({ success: true })
  });
});

// @route   GET api/books/:id
// @desc    Get A Book
// @access  Public
router.get("/:id", (req, res) => {
  Book.getBookById(req.params.id, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

// @route   UPDATE api/books/:id
// @desc    Update A Book
// @access  Private
router.put("/:id", auth, (req, res) => {
  var id = req.params.id;
  var book = req.body.book;
  console.log(book);
  
  Book.updateBook(id, book, {}, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

module.exports = app => app.use('/api/books', router);
