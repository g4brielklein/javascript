import { BookDAO } from "../dao/bookDAO.js";
import { randomUUID } from "node:crypto";
// const utils = require('../utils');
// const prompt = require('prompt-sync')({ sigint: true });

const bookDAO = new BookDAO();

export class BookController {
  createBook = async (bookToCreate, isUsingCLI, callBackFunction) => {
    let book = {};

    if (isUsingCLI) {
      const book = {
        id: await utils.createNewId(),
        name: prompt("Book name: "),
        author: prompt("Author name: "),
      };

      if (!book.name || !book.author) {
        return console.log("Type all informations");
      }

      await bookDAO.createBookDAO(book);
      utils.showSuccessMessage("created");
      return utils.handleContinueOperations(callBackFunction);
    }

    const { name, author } = bookToCreate;
    const createdAt = new Date();

    book = {
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

  updateBook = async (bookToUpdate, isUsingCLI, callBackFunction) => {
    if (isUsingCLI) {
      const bookToUpdate = prompt("Type the id of the book to be updated: ");

      if (!bookToUpdate) {
        return console.log("You have to type an id in order to update a book");
      }

      const idExists = await utils.checkIfIdAlreadyExists(bookToUpdate);

      if (!idExists) {
        return console.log(`[ERROR]: Typed id ${bookToUpdate} dont exists`);
      }

      const infoToBeUpdated = prompt(
        "Which info do you want to update? (name or author) ",
      );
      let newInfo = null;

      if (infoToBeUpdated === "name") {
        newInfo = prompt("And what is going to be the new name? ");
      } else if (infoToBeUpdated === "author") {
        newInfo = prompt("And what is going to be the new author? ");
      } else if (infoToBeUpdated === "id") {
        return console.log("Book's id cannot be updated");
      } else {
        return console.log(`"${infoToBeUpdated}" info dont exists`);
      }

      if (!bookToUpdate || !infoToBeUpdated || !newInfo) {
        return console.log("Type all informations");
      }

      await bookDAO.updateBookDAO(bookToUpdate, infoToBeUpdated, newInfo);
      utils.showSuccessMessage("updated");
      return utils.handleContinueOperations(callBackFunction);
    }

    const bookId = bookToUpdate.id;
    const { name, author } = bookToUpdate;
    const updatedAt = new Date();

    bookToUpdate = {
      bookId,
      name,
      author,
      updatedAt
    };

    return bookDAO.updateBookDAO(bookToUpdate, null, null, null, false);
  };

  deleteBook = async (id, isUsingCLI, callBackFunction) => {
    if (isUsingCLI) {
      const bookToDelete = prompt("Type the id of the book to be deleted: ");

      if (!bookToDelete) {
        return console.log("You have to type an id in order to delete a book");
      }

      const idExists = await utils.checkIfIdAlreadyExists(bookToDelete);

      if (!idExists) {
        return console.log(`[ERROR]: Typed id ${bookToDelete} dont exists`);
      }

      await bookDAO.deleteBookDAO(bookToDelete);
      utils.showSuccessMessage("deleted");
      return utils.handleContinueOperations(callBackFunction);
    }

    return bookDAO.deleteBookDAO(id);
  };

  getStatus = async (callBackFunction) => {
    const status = await bookDAO.getStatusDAO();

    let mostReadedAuthors = [];

    status.mostReadedAuthors.forEach((author) => {
      mostReadedAuthors.push(author.author);
    });

    const statusTable = [
      {
        "Books stored": status.count.totalbooks,
        "Authors stored": status.count.totalauthors,
        "Most readed author(s)": mostReadedAuthors,
      },
    ];

    console.table(statusTable);

    utils.handleContinueOperations(callBackFunction);
  };
}
