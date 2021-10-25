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

exports.pagination = async (req, res, next) => {
  try {
    const sort = req.body.sort;
    const sortDirection = req.body.sortDirection;
    const page = parseInt(req.body.page);
    const pageSize = parseInt(req.body.pageSize);

    let filterValue = "";
    let filterProperty = "";
    let books = [];

    let totalRows = 0;

    if (req.body.filterValue) {
      filterValue = req.body.filterValue.value;
      filterProperty = req.body.filterValue.property;
      books = await BookSchema.find({
        [filterProperty]: new RegExp(filterValue, "i"),
      })
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await BookSchema.find({
        [filterProperty]: new RegExp(filterValue, "i"),
      }).count();
    } else {
      books = await BookSchema.find()
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      totalRows = await BookSchema.find().count();
    }
    const pageQuantity = Math.ceil(totalRows / pageSize);
    res.status(200).json({
      status: 200,
      pageSize,
      page,
      sort,
      sortDirection,
      pageQuantity,
      totalRows,
      data: books,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request " + err.message, 400)
    );
  }
};
