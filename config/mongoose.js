const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/toDoListApp");

const db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));

db.once('open', function(){
    console.log("Connection b/w mngoose and mongoDB was done successfully !");
});