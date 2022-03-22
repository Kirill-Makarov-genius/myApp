const express = require("express");
const multer = require("multer");
const bookStoreController = require("../controllers/bookStoreController");
const bookStoreRouter = express.Router();
const jsonParser = express.json();
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
})


bookStoreRouter.use(multer({storage: storage}).single("bookcover"));

bookStoreRouter.get("/edit/:id", bookStoreController.editBookForm);
bookStoreRouter.put("/edit/:id", jsonParser, bookStoreController.editBook);
bookStoreRouter.get("/create", bookStoreController.createBookForm);
bookStoreRouter.post("/create", bookStoreController.createBook);
bookStoreRouter.delete("/delete/:id", bookStoreController.deleteBook);
bookStoreRouter.get("/:id", bookStoreController.getOneBook);
bookStoreRouter.get("/", bookStoreController.getAllBooks);


module.exports = bookStoreRouter;