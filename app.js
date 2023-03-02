const add = document.querySelector("#add-book");
const modal = document.querySelector(".modal")
const form = document.querySelector("form");
const close = document.querySelector("#close-form");
const submit = document.querySelector("#submit-button");
let Library = []

// brings the form up
add.onclick = function() {
  modal.style.display = "flex";
}

// closes the form
close.onclick = function() {
  closeForm();
}

function closeForm() {
  modal.style.display = "none";
  form.reset();
};

// closes the form when clicking outside the form
window.onclick = function(event) {
  if (event.target == modal) {
    closeForm()
  }
}

// add book to Library and updates cards
submit.addEventListener("click", (event) => {
  event.preventDefault();
  addBook(Library);
  displayLibrary();
});

// book constructor
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// toggle the read status
Book.prototype.toggleStatus = function() {
  let toggle = {"Read": "Not read", "Not read": "Read"};
  this.status = toggle[this.status]
}

// makes the book object and returns it
function makeBook() {
  let bookTitle = document.querySelector("#title").value;
  let bookAuthor = document.querySelector("#author").value;
  let bookPages = document.querySelector("#pages").value;
  let bookStatus = (document.querySelector("#status").checked) ? "Read" : "Not read";

  let book = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
  return book;
}

// adds the book to Librarys
function addBook(Library) {
  let book = makeBook();
  let titleField = document.querySelector("input[name='book_title']");
  let repeatAlert = document.querySelector("#repeat-alert");
  for (let el of Library) {
    // checks if books name already exists
    if (el.title === book.title) {
      // displays warning
      titleField.classList = "invalid";
      repeatAlert.style.display = "block";
      return;
    }
  }

  // removes warning styling if all is good
  titleField.classList.remove("invalid");
  repeatAlert.style.display = "none";
  // adds book to Library and closes form
  Library.push(book);
  closeForm();
}

// creates and displays the cards representing each book
function displayLibrary() {
  // clears cards to redisplay them with new info
  clearCards();
  for (let obj of Library) {
    // creates card for each book
    let card = document.createElement("div");
    card.classList.add("card");
    document.querySelector(".content").appendChild(card);

    // creates delete card button
    let deleteCard = document.createElement("button");
    deleteCard.classList.add("delete-card");
    // assings index of book to its corresponding delete button
    deleteCard.dataset.index = Library.indexOf(obj);
    deleteCard.textContent = "-";
    card.appendChild(deleteCard);

    // adds function to delete card button
    deleteCard.addEventListener("click", () => {
      Library.splice(Number(deleteCard.dataset.index), 1);
      displayLibrary();
    })

    // fills card with info
    for (let i of Object.values(obj).slice(0, 2)) {
      // title and author info
      let line = document.createElement("p")
      line.textContent = i;
      card.appendChild(line);
    }

    // page count info
    let pageCount = document.createElement("p");
    pageCount.textContent = `${obj.pages} pages`;
    card.appendChild(pageCount);

    // status toggle button info
    let toggleStatusBtn = document.createElement("button");
    toggleStatusBtn.classList.add("toggle-status");
    toggleStatusBtn.textContent = obj.status;
    card.appendChild(toggleStatusBtn);

    // changes status and redisplays the cards
    toggleStatusBtn.onclick = function() {
      obj.toggleStatus();
      displayLibrary();
    }
  }
}

// deletes all cards
function clearCards() {
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    document.querySelector(".content").removeChild(card);
  }
}