import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js';

const server = fastify();
const database = new DatabaseMemory();

server.get('/', (req, res) => {
    return 'MovieTracker'
})

server.post('/movies', (req, res) => {
    const { name, releaseYear, gender } = req.body

    const movie = {
        name,
        releaseYear,
        gender,
    };

    database.create(movie);

    return res.status(201).send();
})

server.get('/movies', (req, res) => {
    const { id, releaseYear, search } = req.query
    const movies = database.get({ id, releaseYear }, search);

    return res.send(movies);
})

server.put('/movies/:id', (req, res) => {
    const { id } = req.params;
    const { name, releaseYear, gender } = req.body;

    const movieToUpdate = {
        name,
        releaseYear,
        gender
    }

    database.update(id, movieToUpdate);

    return res.status(204).send();
})

server.delete('/movies/:id', (req, res) => {
    const { id } = req.params;

    database.delete(id)

    return res.status(204).send();
})

server.listen({ port: 3000 }, () => {
    console.log("Server's running")
});
