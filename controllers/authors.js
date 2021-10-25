const ErrorResponse = require("../helper/errorResponse");
const Authors = require("../models/Author");

exports.createAuthor = async (req, res, next) => {
  try {
    const authorData = await Authors.create(req.body);

    res.status(200).json({
      status: 200,
      data: authorData,
    });
  } catch (err) {
    next(
      new ErrorResponse(
        "Error No es posible crear el autor : " + err.message,
        404
      )
    );
  }
};
exports.getAuthors = async (req, res, next) => {
  try {
    const authorsData = await Authors.find();

    res.status(200).json(authorsData);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request " + err.message, 404)
    );
  }
};
exports.getAuthorById = async (req, res, next) => {
  try {
    const authorData = await Authors.findById(req.params.id);
    if (!authorData) {
      return next(
        new ErrorResponse(
          "El Autor no existe En la BD con este Id: " + req.params.id,
          404
        )
      );
    }
    res.status(200).json(authorData);
  } catch (err) {
    next(
      new ErrorResponse("El Autor no existe con este Id: " + req.params.id, 404)
    );
  }
};
exports.updateAuthor = async (req, res, next) => {
  try {
    const authorData = await Authors.findByIdAndUpdate(req.params.id, req.body);

    if (!authorData) {
      return next(
        new ErrorResponse(
          "El Autor no existe En la BD con este Id: " + req.params.id,
          404
        )
      );
    }
    res.status(200).json({
      status: 200,
      data: authorData,
    });
  } catch (err) {
    next(
      new ErrorResponse("El Autor no existe con este Id: " + req.params.id, 404)
    );
  }
};
exports.deleteAuthor = async (req, res, next) => {
  try {
    const authorData = await Authors.findByIdAndDelete(req.params.id);

    if (!authorData) {
      return next(
        new ErrorResponse(
          "El Autor no existe En la BD con este Id: " + req.params.id,
          404
        )
      );
    }
    res.status(200).json({
      status: 200,
    });
  } catch (err) {
    next(
      new ErrorResponse("El Autor no existe con este Id: " + req.params.id, 404)
    );
  }
};
