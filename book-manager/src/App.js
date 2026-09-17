import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [genre, setGenre] = useState("");

  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://worksheet-library.mashupstack.com/books";

  // GET - Get all books
  function getBooks() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
      });
  }

  // Load books when page opens
  useEffect(() => {
    getBooks();
  }, []);

  // CREATE - Add a new book
  function addBook(event) {
    event.preventDefault();

    const book = {
      title: title,
      author: author,
      published_year: publishedYear,
      genre: genre
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    })
      .then((response) => response.json())
      .then(() => {
        alert("Book added successfully!");

        clearForm();
        getBooks();
      })
      .catch((error) => {
        console.log("Error adding book:", error);
      });
  }

  // DELETE - Delete a book
  function deleteBook(id) {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        alert("Book deleted successfully!");
        getBooks();
      })
      .catch((error) => {
        console.log("Error deleting book:", error);
      });
  }

  // Put selected book data into form
  function editBook(book) {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setPublishedYear(book.published_year);
    setGenre(book.genre);
  }

  // UPDATE - Update an existing book
  function updateBook(event) {
    event.preventDefault();

    const updatedBook = {
      title: title,
      author: author,
      published_year: publishedYear,
      genre: genre
    };

    fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedBook)
    })
      .then((response) => response.json())
      .then(() => {
        alert("Book updated successfully!");

        clearForm();
        getBooks();
      })
      .catch((error) => {
        console.log("Error updating book:", error);
      });
  }

  // Clear form
  function clearForm() {
    setTitle("");
    setAuthor("");
    setPublishedYear("");
    setGenre("");
    setEditingId(null);
  }

  return (
    <div className="container">

      <h1>Book Manager</h1>

      {/* Book Form */}
      <div className="form-container">

        <h2>
          {editingId ? "Edit Book" : "Add New Book"}
        </h2>

        <form onSubmit={editingId ? updateBook : addBook}>

          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Published Year"
            value={publishedYear}
            onChange={(event) => setPublishedYear(event.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            required
          />

          <button type="submit">
            {editingId ? "Update Book" : "Add Book"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={clearForm}
              className="cancel-button"
            >
              Cancel
            </button>
          )}

        </form>
      </div>

      {/* Book List */}
      <div className="book-list">

        <h2>All Books</h2>

        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          books.map((book) => (
            <div className="book-card" key={book.id}>

              <h3>{book.title}</h3>

              <p>
                <strong>Author:</strong> {book.author}
              </p>

              <p>
                <strong>Published Year:</strong>{" "}
                {book.published_year}
              </p>

              <p>
                <strong>Genre:</strong> {book.genre}
              </p>

              <button onClick={() => editBook(book)}>
                Edit
              </button>

              <button
                onClick={() => deleteBook(book.id)}
                className="delete-button"
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default App;
