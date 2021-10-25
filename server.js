const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan")
const errorHandler = require("./middleware/error")
const connectDatabase = require("./config/db");

dotenv.config({ path: "./config/config.env" });
connectDatabase();

const book = require("./routes/book");
const author = require("./routes/authors");

const app = express();
app.use(express.json());

if (process.env.NODE_env === "development") {
  app.use(morgan("dev"));
}

app.use("/api/authorLibrary", author);
app.use("/api/book", book);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("Server running on Environment ", process.env.NODE_env);
});

process.on("unhandledRejection", (err, Promise) => {
  console.log("Errors: ", err.message);
  server.close(() => process.exit(1));
});
