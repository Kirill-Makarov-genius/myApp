const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const methodOverride = require('method-override');
const homeRouter = require("./routes/homeRouter");
const bookStoreRouter = require("./routes/bookStoreRouter");
const hbs = require("handlebars");
const app = express();

app.set("view engine", "hbs");
app.set(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));


app.use("/", homeRouter);
app.use("/book-store", bookStoreRouter);



app.use(function(req, res, next){
    res.status(404).send("Not Found");
})



mongoose.connect("mongodb://127.0.0.1/mydb", function(err){
    if (err) return console.log(err);
    app.listen(3000);
})