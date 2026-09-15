import React, { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [publishDate, setPublishDate] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editedBookName, setEditedBookName] = useState("");

  function addBook(event) {
    event.preventDefault();

    if (bookName.trim() === "") {
      alert("Book name cannot be empty.");
      return;
    }

    const newBook = {
      id: books.length + 1,
      bookName: bookName,
      authorName: authorName,
      publishDate: publishDate
    };

    setBooks([...books, newBook]);

    setBookName("");
    setAuthorName("");
    setPublishDate("");
  }

  function editBook(book) {
    setEditingId(book.id);
    setEditedBookName(book.bookName);
  }

  function saveBook(id) {
    if (editedBookName.trim() === "") {
      alert("Book name cannot be empty.");
      return;
    }

    const updatedBooks = books.map(function (book) {
      if (book.id === id) {
        return {
          ...book,
          bookName: editedBookName
        };
      }

      return book;
    });

    setBooks(updatedBooks);
    setEditingId(null);
    setEditedBookName("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditedBookName("");
  }

  function deleteBook(id) {
    const updatedBooks = books.filter(function (book) {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  }

  const filteredBooks = books.filter(function (book) {
    return (
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container">
      <h1 className="text-center">Book List Management App</h1>

      {/* Add Book Form */}
      <div className="card p-4 mb-4">
        <h2>Add New Book</h2>

        <form onSubmit={addBook}>
          <div className="mb-3">
            <label className="form-label">Book Name</label>

            <input
              type="text"
              className="form-control"
              value={bookName}
              onChange={function (event) {
                setBookName(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author Name</label>

            <input
              type="text"
              className="form-control"
              value={authorName}
              onChange={function (event) {
                setAuthorName(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Publish Date</label>

            <input
              type="date"
              className="form-control"
              value={publishDate}
              onChange={function (event) {
                setPublishDate(event.target.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Book
          </button>
        </form>
      </div>

      {/* Search */}
      <div className="mb-4">
        <label className="form-label">Search Books</label>

        <input
          type="text"
          className="form-control"
          placeholder="Search by book name or author name"
          value={searchTerm}
          onChange={function (event) {
            setSearchTerm(event.target.value);
          }}
        />
      </div>

      {/* Book Table */}
      <div className="card p-4">
        <h2>Book List</h2>

        {filteredBooks.length === 0 ? (
          <p>No books found</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Book Name</th>
                  <th>Author Name</th>
                  <th>Publish Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBooks.map(function (book) {
                  return (
                    <tr key={book.id}>
                      <td>{book.id}</td>

                      <td>
                        {editingId === book.id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedBookName}
                            onChange={function (event) {
                              setEditedBookName(event.target.value);
                            }}
                          />
                        ) : (
                          book.bookName
                        )}
                      </td>

                      <td>{book.authorName}</td>

                      <td>{book.publishDate}</td>

                      <td>
                        {editingId === book.id ? (
                          <div>
                            <button
                              className="btn btn-success me-2"
                              onClick={function () {
                                saveBook(book.id);
                              }}
                            >
                              Save
                            </button>

                            <button
                              className="btn btn-secondary"
                              onClick={cancelEdit}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              className="btn btn-warning me-2"
                              onClick={function () {
                                editBook(book);
                              }}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-danger"
                              onClick={function () {
                                deleteBook(book.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
