const utils = require('../utils');
const bookDAO = require('../dao/bookDAO');
const prompt = require('prompt-sync')({ sigint: true });

createBook = async (callBackFunction) => {
    const book = {
        id: await utils.createNewId(),
        name: prompt('Book name: '),
        author: prompt('Author name: ')
    };

    if (!book.name || !book.author) {
        return console.log('Type all informations')
    }

    await bookDAO.createBookDAO(book);
    utils.showSuccessMessage('created');
    utils.handleContinueOperations(callBackFunction);
}

showBooks = async (callBackFunction) => {
    const books = await bookDAO.showBooksDAO();
    console.table(books.rows);

    utils.handleContinueOperations(callBackFunction);
}

updateBook = async (callBackFunction) => {
    const bookToUpdate = prompt('Type the id of the book to be updated: ');

    if (!bookToUpdate) {
        return console.log('You have to type an id in order to update a book')
    }

    const idExists = await utils.checkIfIdAlreadyExists(bookToUpdate);

    if (!idExists) {
        return console.log(`[ERROR]: Typed id ${bookToUpdate} dont exists`)
    }

    const infoToBeUpdated = prompt('Which info do you want to update? (name or author) ');
    let newInfo = null;

    if (infoToBeUpdated === 'name') {
        newInfo = prompt('And what is going to be the new name? ')
    } else if (infoToBeUpdated === 'author') {
        newInfo = prompt('And what is going to be the new author? ')
    } else if (infoToBeUpdated === 'id') {
        return console.log("Book's id cannot be updated")
    } else {
        return console.log(`"${infoToBeUpdated}" info dont exists`)
    }

    if (!bookToUpdate || !infoToBeUpdated || !newInfo) {
        return console.log('Type all informations');
    }

    await bookDAO.updateBookDAO(bookToUpdate, infoToBeUpdated, newInfo);
    utils.showSuccessMessage('updated');
    utils.handleContinueOperations(callBackFunction);
}

deleteBook = async (callBackFunction) => {
    const bookToDelete = prompt('Type the id of the book to be deleted: ')

    if (!bookToDelete) {
        return console.log('You have to type an id in order to delete a book');
    }

    const idExists = await utils.checkIfIdAlreadyExists(bookToDelete);

    if (!idExists) {
        return console.log(`[ERROR]: Typed id ${bookToDelete} dont exists`);
    }

    await bookDAO.deleteBookDAO(bookToDelete);
    utils.showSuccessMessage('deleted');
    utils.handleContinueOperations(callBackFunction);
}

getStatus = async (callBackFunction) => {
    const status = await bookDAO.getStatusDAO();

    let mostReadedAuthors = [];

    status.mostReadedAuthors.forEach(author => {
        mostReadedAuthors.push(author.author)
    })

    const statusTable = [
        {
            "Books stored": status.count.totalbooks,
            "Authors stored": status.count.totalauthors,
            "Most readed author(s)": mostReadedAuthors
        },
    ]

    console.table(statusTable)

    utils.handleContinueOperations(callBackFunction);
}

module.exports = { createBook, showBooks, updateBook, deleteBook, getStatus };
