const express = require("express");
const route = express.Router();

const {
  getBookById,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  pagination,
} = require("../controllers/book");

route.route('/')
    .get(getBooks)
    .post(createBook)
    
route.route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook)
    
route.route('/pagination')
    .post(pagination)
module.exports = route;
