const express = require("express");
const fs = require("fs").promises;
const app = express();

app.use(express.json());

//specifies string from number
const isStringOrNumber = (value) =>
    typeof value === "string" || typeof value === "number";


//returns the results from the given search value - if its a title/author it returns all results that include that value, if its a number - it is case sensitive and returns only results with that exact number value
const returnValue = async (specification) => {
    const existingBooks = await fs.readFile("../data/book.json", "utf8");
    const books = JSON.parse(existingBooks).filter((book) => {
        for (let key in book) {
            if (isStringOrNumber(book[key])) {
                let bookValue = book[key].toString().toLowerCase();
                let specValue = decodeURIComponent(specification)
                    .toString()
                    .toLowerCase();

                if (bookValue === specValue) {
                    return true;
                }
            }
        }
        return false;
    });
    return books;
};

//removes objects that contain the search value and returns that array
const removeValue = async (specification) => {
    const existingBooks = await fs.readFile("../data/book.json", "utf8");
    const books = JSON.parse(existingBooks).filter((book) => {
        for (let key in book) {
            if (isStringOrNumber(book[key])) {
                let bookValue = book[key].toString().toLowerCase();
                let specValue = decodeURIComponent(specification)
                    .toString()
                    .toLowerCase();

                if (bookValue === specValue) {
                    return false;
                }
            }
        }
        return true;
    });
    await fs.writeFile(
        "../data/book.json",
        JSON.stringify(books, null, 2),
        "utf8"
    );
    return books;
};

//welcome message
app.get("/", (req, res) => {
    res.send("Welcome to the Library!");
});

//view all books
app.get("/books", async (req, res) => {
    const existingBooks = await fs.readFile("../data/book.json", "utf8");
    res.send(`The Library:\n ${existingBooks}`);
});

//view specific book
app.get("/books/:findSpecific", async (req, res) => {
    const specification = req.params.findSpecific.toLowerCase();
    const books = await returnValue(specification);

    res.send(books);
});

//view books marked available and all books under that search
app.get("/checkout/:availableSearch", async (req, res) => {
    const specification = req.params.availableSearch.toLowerCase();
    const books = await returnValue(specification);

    const available = books.filter((book) => book.available === true);
    const results = JSON.stringify(available, null, 2);

    if (available.length === 0) {
        res.send(`None of the results are currently available\n ${books}`);
    } else {
        res.send(`All Available Books:\n${results}\n All Results:\n${JSON.stringify(books, null, 2)}`);
    };
});

//create a new book
app.post("/books", async (req, res) => {
    const newBook = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        available: req.body.available,
    };
    const existingBooks = await fs.readFile("../data/book.json", "utf8");
    const books = [...JSON.parse(existingBooks), newBook];
    await fs.writeFile(
        "../data/book.json",
        JSON.stringify(books, null, 2),
        "utf8"
    );
    res.send(`Book: ${newBook.id}\n Status: Added to the shelf!`);
});

//update a specific book
app.put("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const existingBooks = await fs.readFile("../data/book.json", "utf8");
    const updatedBook = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        available: req.body.available,
    };
    const books = JSON.parse(existingBooks).map((book) => {
        return book.id === Number(bookId) ||
            book.title === decodeURIComponent(bookId)
            ? updatedBook
            : book;
    });

    await fs.writeFile(
        "../data/book.json",
        JSON.stringify(books, null, 2),
        "utf8"
    );

    res.send(
        `Book: ${bookId}\n Status: Updated!\n ${JSON.stringify(updatedBook)}`
    );


});

//delete a specific book by ID or Title
app.delete("/books/:deleteSpecific", async (req, res) => {
    const specification = req.params.deleteSpecific;
    books = await removeValue(specification);
    res.send(`Book(s): ${specification}\n Status:Removed from shelf`);
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000: http://localhost:3000`);
});

//update specific filed of specific book by searching a Title or book number using patch TBD
