const prompt = require('prompt-sync')({ sigint: true });
const database = require('./database');
const utils = require('./utils');

activate();

function activate() {
    const op = prompt('Type the operation: (create, read (show all), update or delete): ');

    handleOperationChoice(op);
}

function handleOperationChoice(op) {
    if (op === 'create') {
        createBook();
    } else if (op === 'read') {
        showBooks();
    } else if (op === 'update') {
        updateBook();
    } else if (op == 'delete') {
        deleteBook();
    } else {
        console.log(`"${op}" operation not valid`)
    }
}

async function createBook() {
    const book = {
        bookId: await utils.createNewId(),
        bookName: prompt('Book name: '),
        authorName: prompt('Author name: ')
    };

    if (book.bookId && book.bookName && book.authorName) {
        const idAlreadyExists = await database.query({
            text: 'SELECT id FROM books WHERE id = $1;',
            values: [book.bookId]
        })

        if (idAlreadyExists.rows[0]) {
            console.error(`\n[ERROR]: id ${book.bookId} already exists \n`);
            activate();
        } else {
            await database.query({
                text: "INSERT INTO books VALUES ($1, $2, $3);",
                values: [book.bookId, book.bookName, book.authorName]
            })
        }
    } else {
        return console.log('Type all informations')
    }

    utils.showSuccessMessage('created');

    handleContinueOperations();
}

async function showBooks() {
    const books = await database.query("SELECT * FROM books;");
    console.table(books.rows);

    handleContinueOperations();
}

async function updateBook() {
    const bookToUpdate = prompt('Type the id of the book to be updated: ');
    const infoToBeUpdated = prompt('Which info do you want to update? (name or author) ');
    let newInfo = null;

    const updateQuery = `UPDATE books SET ${infoToBeUpdated} = $1 WHERE id = $2;`

    if (infoToBeUpdated === 'name') {
        newInfo = prompt('And what is going to be the new name? ')
    } else if (infoToBeUpdated === 'author') {
        newInfo = prompt('And what is going to be the new author? ')
    } else if (infoToBeUpdated === 'id') {
        return console.log("Book's id cannot be updated")
    } else {
        return console.log(`"${infoToBeUpdated}" info dont exists`)
    }

    if (bookToUpdate && infoToBeUpdated && newInfo) {
        await database.query({
            text: updateQuery,
            values: [newInfo, bookToUpdate]
        })

        utils.showSuccessMessage('updated');
    } else {
        console.log('Type all informations');
    }

    handleContinueOperations();
}

async function deleteBook() {
    const bookToDelete = prompt('Type the id of the book to be deleted: ')

    if (bookToDelete) {
        const idExists = await utils.checkIfIdAlreadyExists(bookToDelete);

        if (idExists) {
            await database.query({
                text: "DELETE FROM books WHERE id = $1;",
                values: [bookToDelete]
            })
        } else {
            return console.log(`[ERROR]: Typed id ${bookToDelete} dont exists`)
        }
    } else {
        console.log('You have to type an id in order to delete a book')
    }

    utils.showSuccessMessage('deleted');

    handleContinueOperations();
}

function handleContinueOperations() {
    const wantToContinue = prompt('Do you want to do another operation? (yes/no) ')

    if (wantToContinue === 'yes') {
        activate();
    }
}

// TODO: Create controller for crud functions and dao for querys
