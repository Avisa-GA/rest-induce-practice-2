
const Book = require('../models/book')

// fetch all data
async function index(req, res) {

    try {
        const books = await Book.find({})
        res.render('books', { title: 'Book List', books })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }

}

// open a form
function newBook(req, res) {
    res.render('books/new', { title: 'New Book' })
}

async function postBook(req, res) {
    try {
        const { title = "new book", author = "new author" } = req.body;

        const newBook = new Book({
            title: title,
            author: author
        })

        await newBook.save();
        res.status(201).redirect('/books')
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }

}

async function showBook(req, res) {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.render('books/show', { title: 'Book Details', book })
        } else {
            res.status(404).render('404/notFound', { title: "Book not found" })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server internal error')
    }

}


function editBook(req, res) {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (book) {
        res.render('books/edit', { title: 'Edit Book', book });
    } else {
        res.status(404).render('404/notFound', { title: 'Book Not Found!' })
    }
}

function updateBook(req, res) {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], ...req.body };
        res.status(200).redirect(`/books`);
        // res.render('bookUpdated', { title: 'Book Updated', book: books[bookIndex] });
    } else {
        res.status(404).render('404/notFound', { title: 'Book Not Found' });
    }
}

function deleteBook(req, res) {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
    } else {
        res.status(404).render('404/notFound', { title: 'Book Not Found' });
    }
    res.redirect('/books');
}

module.exports = { index, newBook, postBook, editBook, updateBook, showBook, deleteBook }