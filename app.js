const add = document.querySelector("#add-book");
const form = document.querySelector("form");
const close = document.querySelector("#close-form");
const submit = document.querySelector("#submit-button");
let Library = []

add.addEventListener("click", () => {
  form.style.visibility = "visible";
});

close.addEventListener("click", closeForm);

function closeForm() {
  form.style.visibility = "hidden";
  form.reset();
};

submit.addEventListener("click", (event) => {
  event.preventDefault();
  addBook(Library);
  displayLibrary();
  closeForm();
});

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function makeBook() {
  let bookTitle = document.querySelector("#title").value;
  let bookAuthor = document.querySelector("#author").value;
  let bookPages = document.querySelector("#pages").value;
  let bookStatus = document.querySelector("#status").value;
  
  let book = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
  return book;
}

function addBook(Library) {
  let book = makeBook();
  for (let el of Library) {
    if (el.title === book.title) {
      alert("You've already added this book!");
      return
    }
  }
  Library.push(book);
}

function displayLibrary() {
  clearCards();
  for (let obj of Library) {
    // Create card
    let card = document.createElement("div");
    card.classList.add("card");
    document.querySelector(".content").appendChild(card);

    // Create delete card button
    let deleteCard = document.createElement("button");
    deleteCard.classList.add("delete-card");
    deleteCard.dataset.index = Library.indexOf(obj);
    deleteCard.textContent = "-";
    card.appendChild(deleteCard);

    // Add function to delete card button
    deleteCard.addEventListener("click", () => {
      Library.splice(Number(deleteCard.dataset.index), 1);
      displayLibrary();
    })

    // Fill card with info
    for (let i of Object.values(obj)) {
      let line = document.createElement("p")
      line.textContent = i;
      card.appendChild(line);
    }
  }
}

function clearCards() {
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    document.querySelector(".content").removeChild(card);
  }
}