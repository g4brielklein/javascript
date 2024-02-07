const APIUrl = "http://localhost:3333/books";

const bookName = document.getElementById("book-name");
const bookAuthor = document.getElementById("book-author");
const resultMessage = document.getElementsByClassName("result-message")[0];
const showBooksContainer = document.querySelector('.show-books-container');
const bookCounter = document.querySelector('#book-counter');
const formButton = document.querySelector('.form-button')

const createBook = () => {
  const book = {
    name: bookName.value,
    author: bookAuthor.value,
  };

  axios.post(APIUrl, book)
    .then(successCreateBook)
    .catch(errorCreateBook);
};

function successCreateBook() {
  bookName.value = "";
  bookAuthor.value = "";

  showMessage('success', 'created')
}

function errorCreateBook(error) {
  console.error(error.response.data.error)
  showMessage('error', 'creating')
}

const getBooks = async () => {
  const books = await axios.get(APIUrl);
  bookCounter.innerText = `(${books.data.length})`;

  books.data.forEach(book => {
    createBookCard(book)
  })
}

function createBookCard(book) {
  let bookItem = document.createElement('div')
  bookItem.classList.add('book-item')
  bookItem.setAttribute('id', book.id)
  showBooksContainer.appendChild(bookItem);

  let bookInfo = document.createElement('div')
  bookInfo.classList.add('book-info')
  bookItem.appendChild(bookInfo)

  let id = document.createElement('div')
  id.classList.add('book-id')
  bookInfo.appendChild(id)

  let name = document.createElement('div')
  name.classList.add('book-name')
  bookInfo.appendChild(name)

  let author = document.createElement('div')
  author.classList.add('book-author');
  bookInfo.appendChild(author);

  let bookActions = document.createElement('div')
  bookActions.classList.add('book-actions')
  bookItem.appendChild(bookActions)

  let actionButtonUpdate = document.createElement('ion-icon')
  actionButtonUpdate.classList.add('action-button')
  actionButtonUpdate.setAttribute('name', 'pencil-outline')
  actionButtonUpdate.setAttribute('onclick', `openUpdateForm('${book.id}')`)
  bookActions.appendChild(actionButtonUpdate)

  let actionButtonDelete = document.createElement('ion-icon')
  actionButtonDelete.classList.add('action-button')
  actionButtonDelete.setAttribute('name', 'trash-outline')
  actionButtonDelete.setAttribute('onclick', `deleteBook('${book.id}')`)
  bookActions.appendChild(actionButtonDelete)

  id.innerHTML = `<small>Id:</small> <strong>${book.id}</strong>`
  name.innerHTML = `<small>Name:</small> <strong>${book.name}</strong>`;
  author.innerHTML = `<small>Author:</small> ${book.author}`;
}

const deleteBook = (id) => {
  const APIUrlDelete = `${APIUrl}/${id}`

  const didConfirm = window.confirm('Are you sure you want to delete this book?')

  if (didConfirm) {
    axios.delete(APIUrlDelete, id)
    .then(successDeleteBook)
    .catch(errorDeleteBook)
  }
}

function successDeleteBook () {
  refreshBookList()
  showMessage('success', 'deleted')
}

function errorDeleteBook() {
  refreshBookList()
  showMessage('error', 'deleting')
}

function refreshBookList() {
  const previousBookCards = document.querySelectorAll('.book-item')
  previousBookCards.forEach(bookCard => bookCard.remove());

  getBooks()
}

function showMessage(type, message) {
  const toastScreenTime = 3000

  resultMessage.classList.add(type)

  if (type === 'success') {
    resultMessage.innerHTML = `<p>Book ${message} successfully</p>`;
  } else {
    resultMessage.innerHTML = `<p>Error ${message} book, try again</p>`;
  }

  setInterval(() => {
    resultMessage.innerHTML = `<p></p>`;
    resultMessage.classList.remove(type)
  }, toastScreenTime)
}

const openUpdateForm = (id) => {
  window.location = `../update-book/index.html?id=${id}`
}

const getBookById = async (onload) => {
  const paramId = new URLSearchParams(window.location.search).get('id')

  if (paramId) {
    const APIUrlGetBookById = `${APIUrl}?id=${paramId}`

    const book = await axios.get(APIUrlGetBookById)
  
    const { id, name, author } = book.data[0]
  
    bookName.value = name
    bookAuthor.value = author
    formButton.setAttribute('onclick', `updateBook('${id}')`)

    return
  }

  const bookIdDiv = document.querySelector('#book-id-div')
  bookIdDiv.classList.add('active')

  if (!onload) {
    const bookId = document.querySelector('#book-id').value
    const APIUrlGetBookById = `${APIUrl}?id=${bookId}`

    const book = await axios.get(APIUrlGetBookById)

    if (!book.data[0]) {
      return showMessage('error', 'finding')
    }

    showMessage('success', 'founded')

    const { id, name, author } = book.data[0]

    bookName.value = name
    bookAuthor.value = author
    formButton.setAttribute('onclick', `updateBook('${id}')`)
  }
}

const updateBook = (id) => {
  const APIUrlUpdate = `${APIUrl}/${id}`

  updateData = {
    name: bookName.value,
    author: bookAuthor.value,
  }

  axios.put(APIUrlUpdate, updateData)
    .then(() => {
      showMessage('success', 'updated')
    })
    .catch(() => {
      showMessage('error', 'updating')
    })
}
