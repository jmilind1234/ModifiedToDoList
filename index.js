const express = require("express");

const path = require('path');

const app = express();

const port = 8000;

const db = require('./config/mongoose');

const bodyParser = require("body-parser");

const Task = require('./models/Task');

app.use(bodyParser.urlencoded({extended:false}));

//specifying express app where css and vanillaJS files are placed
app.use(express.static('assets'));

//setting up the view engine
app.set('view engine', 'ejs');

//setting path for views
app.set('views', path.join(__dirname, 'views'))

app.get('/', function (req, res) {
    Task.find({}, function(err, tasks){
        if(err){
            console.log("Error while fetching data");
            console.log(err);
            return;
        }
        var extra = [];
        res.render('home',{title: "TO-DO-LIST APPLICATION" , tasks: tasks ,extra: extra});
    })
});

app.get('/deleteTask',function(req,res){
    console.log("Item to delete has task Id" + req.query.taskId);
    Task.findByIdAndRemove({_id : req.query.taskId},function(document){
        console.log("Deleted the document");
        console.log(document);
    })
    res.redirect('/');
});

app.post("/addNewTask", function (req, res) {
    let category = req.body.category;
    let description = req.body.description;
    let dueDate = req.body.dueDate;

    Task.create({
        description: description,
        category:category,
        date:dueDate
    },function(err, newTask){
        if(err){
            console.log("Error while inserting new Task");
            console.log(err);
            return;
        }
        console.log("*********");
        console.log(newTask);
    })
    res.redirect('/');
});

//starting server at the 8000 port
app.listen(port, function (err) {
    if (err) {
        console.log("Error while starting server at port 8000");
    }
    else {
        console.log(`Server started at port ${port}`);
    }
});