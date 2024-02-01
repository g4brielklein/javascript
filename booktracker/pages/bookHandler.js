const APIUrl = "http://localhost:3333/books";
const toastScreenTime = 3000

const bookName = document.getElementById("book-name");
const bookAuthor = document.getElementById("book-author");
const resultMessage = document.getElementsByClassName("result-message")[0]
const showBooksContainer = document.querySelector('.show-books-container');
const bookCounter = document.querySelector('#book-counter');

function postBook(book) {
  const { name, author } = book;

  const newBook = {
    name,
    author,
  };

  axios
    .post(APIUrl, newBook)
    .then(successCreateBook)
    .catch(errorCreateBook);
}

const createBook = () => {
  const book = {
    name: bookName.value,
    author: bookAuthor.value,
  };

  postBook(book);
};

function successCreateBook() {
  bookName.value = "";
  bookAuthor.value = "";

  resultMessage.classList.add('success')
  resultMessage.innerHTML = `<p>Book created successfully!</p>`;

  setInterval(() => {
    resultMessage.innerHTML = `<p></p>`;
    resultMessage.classList.remove('success')
  }, toastScreenTime)
}

function errorCreateBook(error) {
  console.error(error.response.data.error)

  resultMessage.classList.add('error')
  resultMessage.innerHTML = `<p>Error on creating book, try again</p>`;

  setTimeout(() => {
    resultMessage.innerHTML = `<p></p>`;
    resultMessage.classList.remove('error')
  }, toastScreenTime)
}

const getBooks = async () => {
  const books = await axios.get(APIUrl);

  bookCounter.innerText = `(${books.data.length})`;

  books.data.forEach((book) => {
    let div = document.createElement('div')
    div.classList.add('book-item')
    div.setAttribute('onclick', `handleBookClick('${book.id}')`)
    div.setAttribute('id', book.id)
    showBooksContainer.appendChild(div);

    let name = document.createElement('div')
    name.classList.add('book-name')
    div.appendChild(name)

    let author = document.createElement('div')
    author.classList.add('book-author');
    div.appendChild(author);

    name.innerHTML = `<small>Name:</small> <strong>${book.name}</strong>`;
    author.innerHTML = `<small>Author:</small> ${book.author}`;
  })
}

const handleBookClick = (id) => {
  console.log(`clicked - id = ${id}`)
}
