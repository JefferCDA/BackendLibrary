const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
    title: {
        required: [true, "Titulo Requerido"],
        maxlength: [800, "El titulo del libro no puede ser mayor a 800 caracteres"],
        type: String
    },
    description: String,
    price: Number,
    publicationDate: Date,
    author: {
        id: String,
        fullName: String
    }
});
module.exports = mongoose.model("Books", BookSchema);