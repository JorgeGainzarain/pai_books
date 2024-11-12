"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', './views');
// Middleware to parse form data
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.q || '';
    database_1.default.query("SELECT * FROM books WHERE title LIKE ?", [`%${search}%`], (error, results) => {
        if (error)
            throw error;
        res.render('books', { books: results });
    });
}));
app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    const query = 'INSERT INTO books (title, author, year) VALUES (?,?,?)';
    database_1.default.query(query, [title, author, year], (error, results) => {
        if (error)
            throw error;
        res.redirect('/books'); // Redirect to the books list after insertion
    });
});
app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    const query = 'INSERT INTO books (title, author, year) VALUES (?, ?, ?)';
    database_1.default.query(query, [title, author, year], (error, results) => {
        if (error)
            throw error;
        res.redirect('/books'); // Redirect to the books list after insertion
    });
});
app.get('/add-book', (req, res) => {
    res.render('addBook');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
