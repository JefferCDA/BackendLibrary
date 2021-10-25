const { Router } = require("express");
const express = require("express");
const route = express.Router();

const { createAuthor,getAuthors, getAuthorById, updateAuthor, deleteAuthor } = require("../controllers/authors");

route.route("/")
    .post(createAuthor)
    .get(getAuthors)

route.route("/:id")
    .get(getAuthorById)
    .put(updateAuthor)
    .delete(deleteAuthor)

module.exports = route; 
