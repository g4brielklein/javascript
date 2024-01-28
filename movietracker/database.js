import { query } from './connection.js';

export class Database {
    createMovie = async (movie) => {
        const { id, name, releaseYear, gender } = movie;

        return query({
            text: "INSERT INTO movies VALUES ($1, $2, $3, $4);",
            values: [id, name, releaseYear, gender]
        });
    }

    getMovies = async (filters, search) => {
        if (filters.id || filters.releaseYear) {
            if (filters.id && !filters.releaseYear) {
                const idFilterResult = await query({
                    text: "SELECT * FROM movies WHERE id = $1;",
                    values: [filters.id],
                });

                return idFilterResult;
            }

            if (filters.releaseYear && !filters.id) {
                const releaseYearFilterResult = await query({
                    text: 'SELECT * FROM movies WHERE "releaseYear" = $1;',
                    values: [filters.releaseYear],
                });

                return releaseYearFilterResult;
            }

            if (filters.id && filters.releaseYear) {
                const idAndReleaseYearFilterResult = await query({
                    text: 'SELECT * FROM movies WHERE id = $1 AND "releaseYear" = $2;',
                    values: [filters.id, filters.releaseYear],
                });

                return idAndReleaseYearFilterResult;
            }
        }

        if (search) {
            const searchResults = await query({
                text: "SELECT * FROM movies WHERE name ILIKE $1;",
                values: [`%${search}%`],
            });

            return searchResults;
        }

        return query("SELECT * FROM movies;");
    }

    updateMovie = async (movieToUpdate) => {
        const { id, name, releaseYear, gender } = movieToUpdate;

        return query({
            text: 'UPDATE movies SET name = $1, "releaseYear" = $2, gender = $3 WHERE id = $4;',
            values: [name, releaseYear, gender, id],
        });
    }

    deleteMovie = async (id) => {
        return query({
            text: "DELETE FROM movies WHERE id = $1;",
            values: [id],
        });
    }
}
