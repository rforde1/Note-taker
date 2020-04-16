const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");
const uni = require ("uniqid");
const fsReadFile = util.promisify(fs.readFile);
const fsWriteFile = util.promisify(fs.writeFile);



// Set the port of our application

// process.env.PORT lets the port be set by Heroku
let PORT = process.env.PORT || 3000;

// Create express app instance.
let app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Get routes
app.get("/api/notes",(req,res)=>{
  fsReadFile(path.join(__dirname,"/db/db.json")).then(response=>{
      res.json(JSON.parse(response));
  });
});

// Post routes
app.post("/api/notes",(req,res)=>{
  fsReadFile(path.join(__dirname,"/db/db.json")).then(response=>{
    
      let resNotes = JSON.parse(response);

      let uniqueId = uni();

      let notes = {
          noteId: uniqueId,
          noteTitle: req.body.noteTitle,
          noteText: req.body.text
      }

      resNotes.push(notes);
      // Then we want to write this to our db.json
      fsWriteFile(path.join(__dirname,"/db/db.json"),JSON.stringify(resNotes));

      res.end(uniqueId);
      
  });
})

// Dele
app.delete("/api/notes/:id",(req,res)=>{
  function deleteNote(note,res){

    fsReadFile(path.join(__dirname,"/db/db.json"))
    .then(response=>
      {
        let resNotes = JSON.parse(response);
        fsWriteFile(path.join(__dirname,"/db/db.json"),JSON.stringify(resNotes))
        .then(res=>{
            res.sendFile(path.join(__dirname, "/public/notes.html"));
        });
    });
  }

  deleteNote(req.params.id,res);


});

app.get("/notes",(req,res)=>{
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/*",(req,res)=>{
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.listen(PORT, ()=>{
console.log(`listening on port ${PORT}`)
});


