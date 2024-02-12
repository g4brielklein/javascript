import { query } from "../database.js";

export class BookDAO {
  showBooksDAO = async (id, order, searchTerm, isUsingCLI) => {
    if (id) {
      return query({
        text: "SELECT * FROM books WHERE id = $1;",
        values: [id]
      })
    }

    if (order === 'DESC') {
      return query('SELECT * FROM books ORDER BY "updatedAt" DESC;')
    }

    if (searchTerm) {
      return query({
        text: `
          SELECT * FROM books 
          WHERE name ILIKE $1
          OR author ILIKE $1;
        `,
        values: [`%${searchTerm}%`],
      })
    }

    if (isUsingCLI) {
      return query('SELECT id, name, author FROM books ORDER BY "updatedAt";')
    }

    return query('SELECT * FROM books ORDER BY "updatedAt";')
  };

  createBookDAO = async (book) => {
    const { id, name, author, createdAt, updatedAt } = book;

    return query({
      text: "INSERT INTO books VALUES ($1, $2, $3, $4, $5);",
      values: [id, name, author, createdAt, updatedAt],
    });
  };

  updateBookDAO = async (bookToUpdate, id, column, newInfos, isUsingCLI) => {
    if (isUsingCLI) {
      const updateQuery = `
        UPDATE books 
        SET ${column} = $1,
        "updatedAt" = $2
        WHERE id = $3;
      `;

      return query({
        text: updateQuery,
        values: [newInfos.value, newInfos.updatedAt, id],
      });
    }

    const { bookId, name, author, updatedAt } = bookToUpdate;

    return await query({
      text: 'UPDATE books SET name = $1, author = $2, "updatedAt" = $3 WHERE id = $4;',
      values: [name, author, updatedAt, bookId],
    });
  };

  deleteBookDAO = async (id) => {
    return query({
      text: "DELETE FROM books WHERE id = $1;",
      values: [id],
    });
  };

  getBookById = async (id) => {
    return query({
      text: "SELECT * FROM books WHERE id = $1",
      values: [id],
    });
  };

  getLastAddedBook = async () => {
    return database.query(
      "SELECT * FROM books WHERE id = (SELECT MAX(id) FROM books);",
    );
  };

  getStatusDAO = async () => {
    const count = await query(
      "SELECT count(*)::int AS totalBooks, count(DISTINCT author)::int AS totalAuthors FROM books;",
    );
    const mostReadedAuthors = await query(
      `
                WITH author_books_count AS (SELECT DISTINCT author, COUNT(1) AS count FROM books GROUP BY 1)

                SELECT author
                FROM author_books_count
                WHERE count = (SELECT MAX(count) FROM author_books_count);
            `,
    );

    return { count: count.rows[0], mostReadedAuthors: mostReadedAuthors.rows };
  };
}
