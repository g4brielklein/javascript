import Fastify from "fastify";
import { BookController } from "./controllers/bookController.js";
import cors from "@fastify/cors";

const app = Fastify();
const bookController = new BookController();

await app.register(cors, {
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
});

app.get('/', (request, response) => {
  return response.redirect('/books');
})

app.get("/books", async (request, response) => {
  const { id, order } = request.query

  const books = await bookController.showBooks(id, order);

  return response.send(books);
});

app.post("/books", async (request, response) => {
  const { name, author } = request.body;

  const book = {
    name,
    author,
  };

  await bookController.createBook(book);

  return response.status(204).send();
});

app.put("/books/:id", async (request, response) => {
  const { id } = request.params;
  const { name, author } = request.body;

  const book = {
    id,
    name,
    author,
  };

  await bookController.updateBook(book);

  return response.status(204).send();
});

app.delete("/books/:id", async (request, response) => {
  const { id } = request.params;

  await bookController.deleteBook(id);

  return response.status(204).send();
});

app.listen({ port: 3333 }, () => {
  console.log("Server is running");
});
