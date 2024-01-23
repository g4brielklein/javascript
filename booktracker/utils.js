const database = require('./database');

checkIfIdAlreadyExists = async (id) => {
    const foundedId = await database.query({
        text: "SELECT id FROM books WHERE id = $1",
        values: [id]
    });

    return foundedId.rows[0];
}

createNewId = async () => {
    const lastBookId = await database.query("SELECT MAX(id) FROM books;");

    const newId = lastBookId.rows[0].max + 1

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

module.exports = { checkIfIdAlreadyExists, createNewId, showSuccessMessage };
