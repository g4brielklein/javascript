import { randomUUID } from 'node:crypto';

export class DatabaseMemory {
    #movies = new Map();

    create(movie) {
        const movieId = randomUUID();

        this.#movies.set(movieId, movie);
    }

    get(filters, search) {
        const moviesArray = Array.from(this.#movies.entries());

        const movies = moviesArray.map(movie => {
            const data = movie[1];

            return {
                id: movie[0],
                ...data
            };
        });

        let filteredMovies = [];

        if (filters.id || filters.releaseYear) {
            let { id, releaseYear } = filters;

            if (releaseYear) {
                releaseYear = parseInt(releaseYear);
            }

            if (id) {
                filteredMovies = movies.filter(movie => {
                    return movie.id === id
                });
            }

            if (!id && releaseYear) {
                filteredMovies = movies.filter(movie => {
                    return movie.releaseYear === releaseYear
                });
            }

            if (id && releaseYear) {
                filteredMovies = movies.filter(movie => {
                    return movie.id === id
                        && movie.releaseYear === releaseYear
                });
            }

            return filteredMovies;
        };

        if (search) {
            filteredMovies = movies.filter(movie => movie.name.includes(search));

            return filteredMovies;
        }

        return movies;
    }

    update(id, movie) {
        this.#movies.set(id, movie);
    }

    delete(id) {
        this.#movies.delete(id);
    }
}
