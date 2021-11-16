const form = document.querySelector('#new-book-form')
const bookTitle = document.querySelector('#book-title')
const bookAuthor = document.querySelector('#book-author')
const bookPages = document.querySelector('#book-pages')
const bookImage = document.querySelector('#book-image')
const booksContainer = document.querySelector('#books-container')

let myLibrary = []

const Book = function (name, author, pages, image, read) {
  this.name = name
  this.author = author
  this.pages = pages
  this.image = image
  this.read = read
}

Book.prototype.generateID = function () {
  return (this.id =
    Date.now().toString(36) + Math.random().toString(36).substr(2))
}

const buildBook = function () {
  name = bookTitle.value
  author = bookAuthor.value
  pages = bookPages.value
  image = bookImage.value
  read = false
  return new Book(name, author, pages, image, read)
}

const addBookToLibrary = function (book) {
  myLibrary.push(book)
}

const createBookCard = function (book) {
  const { name, author, pages, image, read, id } = book

  const card = document.createElement('div')
  card.classList.add('card')
  card.setAttribute('data-id', id)

  const imageContainer = document.createElement('div')
  imageContainer.classList.add('book-img-container')

  const bookImage = document.createElement('img')
  bookImage.setAttribute('src', image)
  bookImage.classList.add('book-image')
  imageContainer.appendChild(bookImage)
  card.appendChild(imageContainer)

  const infoContainer = document.createElement('div')
  infoContainer.classList.add('book-info-container')

  const bookTitle = document.createElement('h2')
  bookTitle.classList.add('book-title')
  bookTitle.textContent = name
  infoContainer.appendChild(bookTitle)

  const bookAuthor = document.createElement('h3')
  bookAuthor.classList.add('book-author')
  bookAuthor.textContent = author
  infoContainer.appendChild(bookAuthor)

  const bookPages = document.createElement('h4')
  bookPages.classList.add('book-pages')
  bookPages.textContent = `${pages} pages`
  infoContainer.appendChild(bookPages)

  const readButton = document.createElement('button')
  readButton.classList.add('read-button')

  if (!read) {
    readButton.textContent = 'Not Read'
    readButton.classList.add('not-read')
  } else {
    readButton.textContent = 'Read'
    readButton.classList.add('read')
  }

  readButton.addEventListener('click', () => {
    book.read = !book.read
    saveInLocalStorage()
    findInLocalStorage()
    cleanBooksContainer()
    renderBooks(myLibrary)
  })

  infoContainer.appendChild(readButton)

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-button')
  deleteButton.textContent = 'Delete Book'
  infoContainer.appendChild(deleteButton)

  card.appendChild(infoContainer)
  booksContainer.appendChild(card)
}

const cleanBooksContainer = function () {
  while (booksContainer.firstChild) {
    booksContainer.removeChild(booksContainer.firstChild)
  }
}

const renderBooks = function (array) {
  array.forEach((book) => {
    createBookCard(book)
  })
}

const deleteFromLibrary = function (array, id) {
  const index = array.findIndex((book) => book.id === id)
  if (index > -1) {
    array.splice(index, 1)
    saveInLocalStorage()
    findInLocalStorage()
    cleanBooksContainer()
    renderBooks(myLibrary)
  }
}

const saveInLocalStorage = function () {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

const findInLocalStorage = function () {
  if (!localStorage.myLibrary) {
    myLibrary = []
  } else {
    getFromLocalStorage()
  }
}

const getFromLocalStorage = function () {
  const stored = localStorage.getItem('myLibrary')
  myLibrary = JSON.parse(stored)
}

booksContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    const cardElement = event.target.closest('.card')
    const bookID = cardElement.dataset.id
    deleteFromLibrary(myLibrary, bookID)
  }
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const book = buildBook()
  book.generateID()
  addBookToLibrary(book)
  saveInLocalStorage()
  findInLocalStorage()
  cleanBooksContainer()
  renderBooks(myLibrary)
  form.reset()
})

window.addEventListener('load', () => {
  findInLocalStorage()
  renderBooks(myLibrary)
})
