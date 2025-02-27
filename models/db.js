const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST } = process.env;

const db = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const PORT = process.env.PORT || 3000;

mongoose.connection.on("connected", () => {
  console.log(`Database connection successful PORT=${PORT}`);
});

mongoose.connection.on("error", (error) => {
  console.log(`Error database connection ${error.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Database disconnected`);
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Connection to db terminated");
    process.exit(1);
  });
});

module.exports = db;
