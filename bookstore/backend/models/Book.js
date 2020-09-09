const mongoose = require("mongoose");

// Book Schema
const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String
  },
  description: {
    type: String
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String
  },
  pages: {
    type: Number
  },
  image_url: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
}, {
    timestamps: true
  });

const Book = (module.exports = mongoose.model("Book", BookSchema));

// Get Books
module.exports.getBooks = (callback, limit) => {
  Book.find(callback).limit(limit);
};

// Get Book
module.exports.getBookById = (id, callback) => {
  Book.findById(id, callback);
};

// Add Book
module.exports.addBook = (book, callback) => {
  Book.create(book, callback);
};

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
  var query = { _id: id };
  
  var update = {
    title: book.title,
    genre: book.genre,
    description: book.description,
    author: book.author,
    publisher: book.publisher,
    pages: book.pages,
    image_url: book.image_url,
    price: book.price
  };
  Book.findOneAndUpdate(query, update, options, callback);
};

// Delete Book
module.exports.removeBook = (id, callback) => {
  var query = { _id: id };
  Book.remove(query, callback);
};
