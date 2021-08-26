const express = require("express");
const { v1: uuidv1 } = require("uuid");
const fs = require("fs");
const path = require("path");
const { readAndAppend, readFromFile } = require("./helpers/fsutils");

const app = express();
const PORT = process.env.PORT || 1000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/api/notes', (req, res) => {
  readFromFile('db/db.json').then((data) =>
    res.json(JSON.parse(data))
  );
});