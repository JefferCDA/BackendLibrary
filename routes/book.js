const express = require("express");
const route = express.Router();

const {
  getBookById,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book");

route.route('/')
    .get(getBooks)
    .post(createBook)
    
route.route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook)

module.exports = route;
