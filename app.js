const express = require("express");
const cors = require("cors");
const path = require("path");

const api = require("./api");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/contacts", api.contacts);
app.use("/api/v1/auth", api.auth);

const usersDir = path.join(process.cwd(), "/public/avatars");
app.use("/avatars", express.static(usersDir));

app.use((_, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ status: "fail", code: status, message: message });
});

module.exports = app;
