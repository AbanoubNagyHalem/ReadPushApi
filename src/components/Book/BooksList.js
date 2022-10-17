import React from "react";

const BooksList = ({ isLoading, book }) => {
  const bookList =
    book.length > 0
      ? book.map((item) => (
          <li
            className="list-group-item d-flex  justify-content-between align-items-center"
            key={item.id}
          >
            <div>{item.title}</div>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-primary">
                Read
              </button>
              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </div>
          </li>
        ))
      : "There is no book";

  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "Loading. . . " : <ul className="list-group">{bookList}</ul>}
    </div>
  );
};

export default BooksList;
