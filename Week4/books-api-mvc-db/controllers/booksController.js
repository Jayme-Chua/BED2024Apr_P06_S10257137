const Book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving books");
  }
};

const getBookById = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await Book.getBookById(bookId);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving book");
  }
  
  const createBook = async (req, res) => {
    const newBook = req.body;
    try {
      const createdBook = await Book.createBook(newBook);
      res.status(201).json(createdBook);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating book");
    }
  };
  const updateBook = async (req, res) => {
    const bookId = parseInt(req.params.id);
    const newBookData = req.body;
  
    try {
      const updatedBook = await Book.updateBook(bookId, newBookData);
      if (!updatedBook) {
        return res.status(404).send("Book not found");
      }
      res.json(updatedBook);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating book");
    }
  };
  
  const deleteBook = async (req, res) => {
    const bookId = parseInt(req.params.id);
  
    try {
      const success = await Book.deleteBook(bookId);
      if (!success) {
        return res.status(404).send("Book not found");
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting book");
    }
  };
};

const User = require("../models/user");
async function searchUsers(req, res) {
  const searchTerm = req.query.searchTerm; // Extract search term from query params

  try {    
    const users = await User.searchUsers(searchTerm);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching users" });
  }
}
async function getUsersWithBooks(req, res) {
  try {
    const users = await User.getUsersWithBooks();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users with books" });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  searchUsers,
  getUsersWithBooks,
};


