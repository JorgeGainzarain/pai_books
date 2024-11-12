import express from 'express';
import connection from './database';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.get('/books', async (req, res) => {
    const search = req.query.q || '';
    connection.query(
        "SELECT * FROM books WHERE title LIKE ?",
        [`%${search}%`],
        (error, results) => {
            if (error) throw error;
            res.render('books', { books: results });
        }
    );
});

app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    const query = 'INSERT INTO books (title, author, year) VALUES (?,?,?)';
    connection.query(query, [title, author, year], (error, results) => {
        if (error) throw error;
        res.redirect('/books'); // Redirect to the books list after insertion
    });
})

app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    const query = 'INSERT INTO books (title, author, year) VALUES (?, ?, ?)';
    connection.query(query, [title, author, year], (error, results) => {
        if (error) throw error;
        res.redirect('/books'); // Redirect to the books list after insertion
    });
});

app.get('/add-book', (req, res) => {
    res.render('addBook');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});