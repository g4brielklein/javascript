import { BookDAO } from "../dao/bookDAO.js";
import { randomUUID } from "node:crypto";

const bookDAO = new BookDAO();

export class BookController {
  createBook = async (bookToCreate) => {
    const { name, author } = bookToCreate;
    const createdAt = new Date();

    const book = {
      id: randomUUID(),
      name,
      author,
      createdAt,
      updatedAt: createdAt
    };

    return bookDAO.createBookDAO(book);
  };

  showBooks = async (id, order, searchTerm) => {
    const books = await bookDAO.showBooksDAO(id, order, searchTerm);

    return books.rows;
  };

  updateBook = async (bookToUpdate) => {
    const { id, name, author } = bookToUpdate;
    const updatedAt = new Date();

    bookToUpdate = {
      id,
      name,
      author,
      updatedAt
    };

    return bookDAO.updateBookDAO(bookToUpdate, null, null, null, false);
  };

  deleteBook = async (id) => {
    return bookDAO.deleteBookDAO(id);
  };
}
