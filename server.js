const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const server = express();

// use express to handle data
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Data
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

server.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// Listener
server.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
