import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';

const server = fastify();

const databaseMemory = new DatabaseMemory();
const database = new Database();

server.get('/', (req, res) => {
    res.redirect('/movies');
})

server.post('/movies', async (req, res) => {
    const { name, releaseYear, gender } = req.body;

    const movie = {
        id: randomUUID(),
        name,
        releaseYear,
        gender,
    };

    // databaseMemory.create(movie);
    await database.createMovie(movie);

    return res.status(201).send();
})

server.get('/movies', async (req, res) => {
    const { id, releaseYear, search } = req.query;

    // const movies = databaseMemory.get({ id, releaseYear }, search);
    const movies = await database.getMovies({id, releaseYear}, search);

    return res.send(movies.rows);
})

server.put('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const { name, releaseYear, gender } = req.body;

    const movieToUpdate = {
        id,
        name,
        releaseYear,
        gender,
    };

    // databaseMemory.update(id, movieToUpdate);
    await database.updateMovie(movieToUpdate);

    return res.status(204).send();
})

server.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;

    // databaseMemory.delete(id)
    await database.deleteMovie(id);

    return res.status(204).send();
})

server.listen(
    { 
        port: 3000 || process.env.PORT,
        host: "0.0.0.0"

    },
    () => {
    console.log("Server's running")
});
