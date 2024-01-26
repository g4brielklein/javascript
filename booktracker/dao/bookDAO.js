const database = require('../database');

showBooksDAO = async () => {
    return database.query("SELECT * FROM books ORDER BY id;");
}

createBookDAO = async (book) => {
    const { id, name, author } = book;

    await database.query({
        text: "INSERT INTO books VALUES ($1, $2, $3);",
        values: [id, name, author]
    })
}

updateBookDAO = async (id, column, newValue) => {
    const updateQuery = `UPDATE books SET ${column} = $1 WHERE id = $2;`

    await database.query({
        text: updateQuery,
        values: [newValue, id]
    })
}

deleteBookDAO = async (id) => {
    await database.query({
        text: "DELETE FROM books WHERE id = $1;",
        values: [id]
    })
}

getBookById = async (id) => {
    return database.query({
        text: "SELECT * FROM books WHERE id = $1",
        values: [id]
    });
}

getLastAddedBook = async () => {
    return database.query("SELECT * FROM books WHERE id = (SELECT MAX(id) FROM books);")
}

getStatusDAO = async () => {
    const count = await database.query("SELECT count(*)::int AS totalBooks, count(DISTINCT author)::int AS totalAuthors FROM books;");
    const mostReadedAuthors = await database.query(
        `
            WITH author_books_count AS (SELECT DISTINCT author, COUNT(1) AS count FROM books GROUP BY 1)
        
            SELECT author
            FROM author_books_count
            WHERE count = (SELECT MAX(count) FROM author_books_count);
        `
    );

    return { count: count.rows[0], mostReadedAuthors: mostReadedAuthors.rows };
}

module.exports = { showBooksDAO, createBookDAO, updateBookDAO, deleteBookDAO, getBookById, getLastAddedBook, getStatusDAO };
