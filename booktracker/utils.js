const prompt = require('prompt-sync')({ sigint: true });
const bookDAO = require('./dao/bookDAO');

checkIfIdAlreadyExists = async (id) => {
    const foundedId = await bookDAO.getBookById(id);

    return foundedId.rows[0];
}

createNewId = async () => {
    const lastBookId = await bookDAO.getLastAddedBook();

    const newId = lastBookId.rows[0].id + 1

    const idAlreadyExists = await checkIfIdAlreadyExists(newId);

    if (idAlreadyExists) {
        return console.log('[ERROR]: Error generating new id')
    }

    return newId;
};

showSuccessMessage = (action) => {
    const actionMessage = action ? `Book successfully ${action}` : 'Success'
    console.log(`\n${actionMessage}\n`)
}

handleContinueOperations = (callBackFunction) => {
    const wantToContinue = prompt('Do you want to do another operation? (yes/no) ').toLowerCase();

    if (wantToContinue === 'yes' || wantToContinue === 'y' || wantToContinue === '') {
        return callBackFunction.activate();
    } else if (wantToContinue === 'no' || wantToContinue === 'n') {
        return console.log('Operation finished')
    }
}

module.exports = { checkIfIdAlreadyExists, createNewId, showSuccessMessage, handleContinueOperations };
