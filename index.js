const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { log } = require('console');
 
app.set("view engine" , "ejs");                         // To bind with EJS 

app.use(express.json());                                // To convert data into readable format through json
app.use(express.urlencoded({extended : true}));         // These are middlewares

app.use(express.static(path.join(__dirname , "public")));  

app.get('/' , function(req , res) {   
    fs.readdir(`./files` , function(err , files){               // Routes
        res.render("index" , {files : files});
    })  
});

app.get('/files/:filename', function(req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata) {
       if (err) {
          return res.status(500).send("File not found or error reading the file.");
       }
       res.render('show', { filename: req.params.filename, filedata: filedata });
    });
 });

app.post('/create' , function(req , res) {   
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt` , req.body.details , function(err){            // Creating a file with the given title in the input by user 
        res.redirect('/')
    });      
});

app.listen(3000);