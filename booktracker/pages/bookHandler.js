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
    div.setAttribute('id', book.id)
    showBooksContainer.appendChild(div);

    let bookInfo = document.createElement('div')
    bookInfo.classList.add('book-info')
    div.appendChild(bookInfo)

    let name = document.createElement('div')
    name.classList.add('book-name')
    bookInfo.appendChild(name)

    let author = document.createElement('div')
    author.classList.add('book-author');
    bookInfo.appendChild(author);

    let bookActions = document.createElement('div')
    bookActions.classList.add('book-actions')
    div.appendChild(bookActions)

    let actionButtonUpdate = document.createElement('ion-icon')
    actionButtonUpdate.classList.add('action-button')
    actionButtonUpdate.setAttribute('name', 'pencil-outline')
    actionButtonUpdate.setAttribute('onclick', `updateBook('${book.id}')`)
    bookActions.appendChild(actionButtonUpdate)

    let actionButtonDelete = document.createElement('ion-icon')
    actionButtonDelete.classList.add('action-button')
    actionButtonDelete.setAttribute('name', 'trash-outline')
    actionButtonDelete.setAttribute('onclick', `deleteBook('${book.id}')`)
    bookActions.appendChild(actionButtonDelete)

    name.innerHTML = `<small>Name:</small> <strong>${book.name}</strong>`;
    author.innerHTML = `<small>Author:</small> ${book.author}`;
  })
}

const updateBook = (id) => {
  console.log(`update book - id = ${id}`)

}

const deleteBook = (id) => {
  const APIUrlDelete = `${APIUrl}/${id}`

  const didConfirm = window.confirm('Are you sure you want to delete this book?')

  console.log(didConfirm)

  if (didConfirm) {
    axios.delete(APIUrlDelete, id)
    .then(successDeleteBook)
    .catch(errorDeleteBook)
  }
}

function successDeleteBook () {
  const previousBookCards = document.querySelectorAll('.book-item')
  previousBookCards.forEach(bookCard => bookCard.remove());

  getBooks()
}

function errorDeleteBook() {
  console.log('error deleting book')
}
