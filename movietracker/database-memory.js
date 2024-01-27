import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
    #movies = new Map();

    create(movie) {
        const movieId = randomUUID();

        this.#movies.set(movieId, movie);
    }

    get() {
        const moviesArray = Array.from(this.#movies.entries());

        const movies = moviesArray.map(movie => {
            const data = movie[1]

            return {
                id: movie[0],
                ...data
            }
        });

        return movies;
    }

    update(id, movie) {
        this.#movies.set(id, movie);
    }

    delete(id) {
        this.#movies.delete(id);
    }
}
