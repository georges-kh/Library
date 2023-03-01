const add = document.querySelector("#add-book");
const modal = document.querySelector(".modal")
const form = document.querySelector("form");
const close = document.querySelector("#close-form");
const submit = document.querySelector("#submit-button");
let Library = []

add.addEventListener("click", () => {
  modal.style.display = "flex";
});

close.addEventListener("click", closeForm);

function closeForm() {
  modal.style.display = "none";
  form.reset();
};

window.onclick = function(event) {
  if (event.target == modal) {
    closeForm()
  }
}

submit.addEventListener("click", (event) => {
  event.preventDefault();
  addBook(Library);
  displayLibrary();
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
  let bookStatus = (document.querySelector("#status").checked) ? "Read" : "Not read";

  let book = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
  return book;
}

function addBook(Library) {
  let book = makeBook();
  let titleField = document.querySelector("input[name='book_title']");
  let repeatAlert = document.querySelector("#repeat-alert");
  for (let el of Library) {
    if (el.title === book.title) {
      titleField.classList = "invalid";
      repeatAlert.style.display = "block";
      return;
    }
  }

  titleField.classList.remove("invalid");
  repeatAlert.style.display = "none";
  Library.push(book);
  closeForm();
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
    for (let i of Object.values(obj).slice(0, 2)) {
      let line = document.createElement("p")
      line.textContent = i;
      card.appendChild(line);
    }

    let pageCount = document.createElement("p");
    pageCount.textContent = `${obj.pages} pages`;
    card.appendChild(pageCount);

    let toggleStatusBtn = document.createElement("button");
    toggleStatusBtn.classList.add("toggle-status");
    toggleStatusBtn.textContent = obj.status;
    card.appendChild(toggleStatusBtn);

    let toggle = {"Read": "Not read", "Not read": "Read"};
    toggleStatusBtn.onclick = function() {
      toggleStatusBtn.textContent = toggle[toggleStatusBtn.textContent];
    }
  }
}

function clearCards() {
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    document.querySelector(".content").removeChild(card);
  }
}