console.log('Library Project')

const form = document.querySelector('#new-book-form')
const bookTitle = document.querySelector('#book-title')
const bookAuthor = document.querySelector('#book-author')
const bookPages = document.querySelector('#book-pages')
const bookImage = document.querySelector('#book-image')
const booksContainer = document.querySelector('#books-container')

const myLibrary = []

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

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read
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

  // const readStatus = document.createElement('p')
  // readStatus.classList.add('read-status')
  // readStatus.textContent = read
  // infoContainer.appendChild(readStatus)

  const readButton = document.createElement('button')
  readButton.classList.add('read-button')
  if (read) {
    readButton.classList.add('read')
    readButton.textContent = 'Book finished'
  } else {
    readButton.classList.add('not-read')
    readButton.textContent = 'Book unfinished'
  }
  readButton.addEventListener('click', (event) => {
    book.toggleReadStatus()
    // const cardElement = event.target.closest('.card')
    // const bookID = cardElement.dataset.id
    // checkForReadStatus(myLibrary, bookID)
  })

  infoContainer.appendChild(readButton)

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-button')
  deleteButton.textContent = 'Delete Book'
  deleteButton.addEventListener('click', (event) => {
    const cardElement = event.target.closest('.card')
    const bookID = cardElement.dataset.id
    deleteFromLibrary(myLibrary, bookID)
  })

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

// const checkForReadStatus = function (array, id) {
//   const index = array.findIndex((book) => book.id === id)

//   // if (index.read) {
//   //   !index.read
//   // }

//   index.toggleReadStatus()
//   // book.toggleReadStatus()
//   // cleanBooksContainer()
//   // renderBooks(myLibrary)
//   console.log(index.read)
// }

const deleteFromLibrary = function (array, id) {
  const index = array.findIndex((book) => book.id === id)
  if (index > -1) {
    array.splice(index, 1)
    cleanBooksContainer()
    renderBooks(myLibrary)
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const book = buildBook()
  book.generateID()
  addBookToLibrary(book)
  cleanBooksContainer()
  renderBooks(myLibrary)
  bookTitle.value = ''
  bookAuthor.value = ''
  bookPages.value = ''
  bookImage.value = ''
})
