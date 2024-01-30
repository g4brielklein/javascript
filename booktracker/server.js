import Fastify from "fastify";
import { BookController } from "./controllers/bookController.js";

const app = Fastify();

const bookController = new BookController();

app.get("/", async (request, response) => {
  const books = await bookController.showBooks();

  return response.send({
    API: "BookTracker API",
    books,
  });
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
