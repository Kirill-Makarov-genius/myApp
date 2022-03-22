const bookModel = require("../models/book");

//REST api

//GET
exports.getAllBooks = function(req, res){
    const PAGE_SIZE = 10;

    const page = parseInt(req.query.page);
    const skip = (page - 1) * PAGE_SIZE;
    let count = 0;
    bookModel.countDocuments((err, res) => count = res);
    

    bookModel.find({}, function(err, allBooks){
        if (err){
            console.log(err);
            res.sendStatus(404);
        }

        let pagination = {};
        pagination.next = page + 1;
        pagination.previous = page - 1;


        res.render("bookStore.hbs", {
            books: allBooks,
            pagination: pagination
        });
    })
    .skip(skip)
    .limit(PAGE_SIZE);
};

exports.getOneBook = function(req, res){
    const id = req.params.id;
    bookModel.findById(id, function(err, book){
        if (err){
            console.log(err);
            res.sendStatus(404);
        }
        res.render("showBook.hbs", {
            book: book
        });
    })
}

exports.editBookForm = function(req, res){
    const id = req.params.id;
    bookModel.findById(id, function(err, book){
        if (err){
            console.log(err);
            res.sendStatus(404);
        }
        res.render("editBookForm.hbs", {
            book: book
        })
    })
}

exports.createBookForm = function(req, res){

    res.render("createBookForm.hbs");
}


//POST - Create
exports.createBook = function(req, res){
    if (!req.body) return res.sendStatus(400);
    const bookName = req.body.name;
    const bookAuthor = req.body.author;
    const bookPrice = req.body.price;
    const bookcover = req.file.filename;
    console.log("work post");
    const newBook = new bookModel({name: bookName, author: bookAuthor, price: bookPrice, bookcover: bookcover});
    newBook.save(function(err){
        if (err) return console.log(err);
        res.redirect("/book-store");
    });   
};

// POST - Update
exports.editBook = async function(req,res){

    const id = req.params.id;
    const oldBook = await bookModel.findById(id);
    
    oldBook.name = req.body.name;
    oldBook.author = req.body.author;
    oldBook.bookcover = req.file.filename;
    oldBook.price = req.body.price;
    await oldBook.save(function(err, data){
        res.redirect("/book-store");
    })
}

//Delete
exports.deleteBook = function(req, res){
    const id = req.params.id;
    bookModel.findByIdAndDelete(id, function(err, book){
        if (err){
            console.log(err);
            res.sendStatus(404);
        }
        console.log(book);
        res.redirect("/book-store");
    })
}














