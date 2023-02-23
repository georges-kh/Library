class Books {
  constructor(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.stauts = status;
  }
}

let Library = [];

function addBook(book) {
  Library.push(book);
}
