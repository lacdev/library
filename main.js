console.log('Library Project')

function Book(name, author, pages, read) {
  this.name = name
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.info = function () {
  if (this.read === true) {
    return `${this.name} by ${this.author}, ${this.pages} pages, I read the book already`
  } else {
    return `${this.name} by ${this.author}, ${this.pages} pages, I haven't read the book.`
  }
}

const book1 = new Book('Algorithms to Live By', 'Brian Christian', 368, true)

console.log(book1)

const book2 = new Book('Clean Code', 'Robert C. Martin', 464, false)

console.log(book2)
