console.log('Library Project')

const myLibrary = []
const Book = function (name, author, pages, read) {
  this.name = name
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.info = function () {
  if (this.read) {
    return `${this.name} by ${this.author}, ${this.pages} pages, I read the book already`
  } else {
    return `${this.name} by ${this.author}, ${this.pages} pages, I haven't read the book.`
  }
}

const book1 = Object.create(Book)
