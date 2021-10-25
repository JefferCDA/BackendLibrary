const ErrorResponse = require("../helper/errorResponse");
const BookSchema = require("../models/Books");
exports.getBooks = async (req, res, next) => {
  try {
    const booksData = await BookSchema.find();
    res.status(200).json(booksData);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request " + err.message, 400)
    );
  }
};
exports.getBookById = async (req, res, next) => {
  try {
    const bookData = await BookSchema.findById(req.params.id);
    if (!bookData) {
      return next(new ErrorResponse("No se pudo encontrar el Libro ", 404));
    }
    res.status(200).json(bookData);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request " + err.message, 400)
    );
  }
};
exports.createBook = async (req, res, next) => {
  try {
    const bookData = await BookSchema.create(req.body);
    res.status(200).json({
      status: 200,
      data: bookData,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request " + err.message, 400)
    );
  }
};
exports.updateBook = async (req, res, next) => {
  try {
    const bookData = await BookSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!bookData) {
      return next(new ErrorResponse("No se pudo encontrar el Libro ", 404));
    }
    res.status(200).json(bookData);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request " + err.message, 400)
    );
  }
};
exports.deleteBook = async (req, res, next) => {
  try {
    const bookData = await BookSchema.findByIdAndDelete(req.params.id);
    if (!bookData) {
      return next(new ErrorResponse("No se pudo encontrar el Libro ", 404));
    }
    res.status(200).json(bookData);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request " + err.message, 400)
    );
  }
};
