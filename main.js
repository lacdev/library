console.log('Library Project')

function Book(name, author, pages, read) {
  this.name = name
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function () {
    if (read === true) {
      read = 'Read book'
    } else {
      read = 'Not read yet'
    }
    return `${name} by ${author}, ${pages} pages, ${read}`
  }
}

const book1 = new Book('Algorithms to Live By', 'Brian Christian', 368, true)

console.log(book1)

const book2 = new Book('Clean Code', 'Robert C. Martin', 464, false)

console.log(book2)
