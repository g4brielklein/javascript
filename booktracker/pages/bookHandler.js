const bookName = document.getElementById("book-name");
const bookAuthor = document.getElementById("book-author");

function postBook(book) {
  const { name, author } = book;

  const url = "http://localhost:3333/books";

  const newBook = {
    name,
    author,
  };

  axios
    .post(url, newBook)
    .then(successCreateBook)
    .catch((error) => console.log(error));
}

const createBook = () => {
  const book = {
    name: bookName.value,
    author: bookAuthor.value,
  };

  postBook(book);
};

function successCreateBook() {
  const resultMessageDiv = document.getElementsByClassName("result-message")[0]
  const bookNameDiv = document.getElementById("book-name");
  const bookAuthorDiv = document.getElementById("book-author");

  bookNameDiv.value = "";
  bookAuthorDiv.value = "";

  resultMessageDiv.classList.add('active')
  resultMessageDiv.innerHTML = `<p>Book created successfully!</p>`;

  setInterval(() => {
    resultMessageDiv.classList.remove('active')
  }, 3000)
}
