let express = require("express");
let fs = require("fs");
const path = require("path");


// Set the port of our application
// process.env.PORT lets the port be set by Heroku
let PORT = process.env.PORT || 8080;

// Create express app instance.
let app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Develop'))


// Create routes for user to take notes
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/assets/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/assets/index.html"));
});

app.get("/api/notes", function(req, res) {
  
});


// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  }); 