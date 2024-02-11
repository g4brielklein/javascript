import { BookDAO } from "../dao/bookDAO.js";
import { randomUUID } from "node:crypto";
import { Utils } from "../utils.js";
import promptSync from "prompt-sync";

const bookDAO = new BookDAO();
const utils = new Utils();
const prompt = promptSync();

export class BookControllerCLI {
  createBook = async (callBackFunction) => {
    const createdAt = new Date();

    const book = {
        id: randomUUID(),
        name: prompt("Book name: "),
        author: prompt("Author name: "),
        createdAt,
        updatedAt: createdAt
    };

    if (!book.name || !book.author) {
        return console.log("Type all informations");
    }

    await bookDAO.createBookDAO(book);
    utils.showSuccessMessage("created");
    return utils.handleContinueOperations(callBackFunction);
  };

  showBooks = async (callBackFunction) => {
    const books = await bookDAO.showBooksDAO(null, null, null, true);

    console.table(books.rows);
    return utils.handleContinueOperations(callBackFunction);
  };
  
  updateBook = async (callBackFunction) => {
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
    let newInfos = {};
    newInfos.updatedAt = new Date();

    if (infoToBeUpdated === "name") {
      newInfos.value = prompt("And what is going to be the new name? ");
    } else if (infoToBeUpdated === "author") {
      newInfos.value = prompt("And what is going to be the new author? ");
    } else if (infoToBeUpdated === "id") {
      return console.log("Book's id cannot be updated");
    } else {
      return console.log(`"${infoToBeUpdated}" info dont exists`);
    }

    if (!bookToUpdate || !infoToBeUpdated || !newInfos.value) {
      return console.log("Type all informations");
    }

    await bookDAO.updateBookDAO(null, bookToUpdate, infoToBeUpdated, newInfos, true);
    utils.showSuccessMessage("updated");
    return utils.handleContinueOperations(callBackFunction);
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
