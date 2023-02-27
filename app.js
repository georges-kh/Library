// BRING FORM UP
const add = document.querySelector("#add-book");
const form = document.querySelector("form");

add.addEventListener("click", () => {
  form.style.display = "flex";
});


// CLOSE FORM
const close = document.querySelector("#close-form");

close.addEventListener("click", closeForm);

function closeForm() {
  form.style.display = "none";
}

// STORE BOOKS
class Books {
  constructor(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.stauts = status;
  }
}

let Library = [];

// stores books in the Library object
function addBook(book) {
  // book: an object that contains all the information the user submitted about a book
  // Does not return anything, stores each book in Library
  Library.push(book);
}


// displays each book in card on the page
function displayBook() {
  // Library: an array of object containing information about each  book  the user submitted
  
  //creates a div with the class "card" and adds it to "content"
  let card = document.createElement("div");
  document.querySelector(".content").appendChild(card);
  card.classList.add("card");
  
  for (let i of Object.values(Library[Library.length - 1])) {
    //creates a p element and adds the name, author, page count, and status a book and adds it to card
    let line = document.createElement("p");
    line.textContent = i;
    card.appendChild(line);
  }
}


// PREVENT THE FORM FROM SUBMITTING
const submit = document.querySelector("#submit-button");
submit.addEventListener("click", (event) => {
  event.preventDefault();
  closeForm();
  updateLibrary();
  displayBook();
})

function updateLibrary() {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const statusValue = (document.querySelector("#status").checked) ? "Read" : "Not read";

  let book = new Books(title.value, author.value, pages.value, statusValue);
  addBook(book);
}
