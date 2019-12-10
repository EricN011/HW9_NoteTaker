const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

// use express to handle data
app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("db.json", (err, data) => {
    if (err) throw err;
    database = JSON.parse(data);
    return res.json(database[0].notes);
  });
});

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
