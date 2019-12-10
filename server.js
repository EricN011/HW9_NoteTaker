const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const fs = require("fs");
let data = [];

// use express to handle data
app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("assets"));

// Data
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// reading & parsing data
app.get("/notes", (req, res) => {
  fs.readFile("/db/db.json", (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    return res.json(data[0].notes);
  });
});
// posting data
app.post("/notes", (req, res) => {
  req.body.id = data[0].lastID++;
  data[0].notes.push(req.body);
  fs.writeFile("/db/db.json", JSON.stringify(data), "utf8", err => {
    if (err) {
      console.log(err);
    }
  });

  res.json(true);
});

// delete data
app.delete("/notes/:id", (req, res) => {
  data[0].notes.splice(
    data[0].notes.findIndex(function(i) {
      return i.id === req.params.id;
    }),
    1
  );
  fs.writeFile("db.json", JSON.stringify(data), "utf8", err => {
    if (err) {
      console.log(err);
    }
  });

  res.json(true);
});

let init = () => {
  if (fs.existsSync("./db/db.json")) {
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      database = JSON.parse(data);
    });
  } else {
    fs.readFile("./db/template.json", (err, data) => {
      if (err) throw err;
      database = JSON.parse(data);
      fs.writeFile("./db/db.json", JSON.stringify(database), "utf8", err => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
};

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

init();
