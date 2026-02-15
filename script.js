// function Book(title, author, pages, read) {
//     if (!new.target) {
//         throw Error("You must use the 'new' operator to call the constructor");
//     }
//     this.title = title, 
//         this.author = author,
//         this.pages = pages,
//         this.read = read,
//         this.id = crypto.randomUUID();
// }


// Book.prototype.changeReadStatus = function () {
//     this.card = $(`[data-unique-id="${this.id}"]`);
//     this.readIcon = this.card.lastElementChild.lastElementChild;
//     if (this.read) {
//         this.read = false;
//         this.readIcon.setAttribute('src', 'imgs/icons/eye-outline.svg')
//     } else {
//         this.read = true;
//         this.readIcon.setAttribute('src', 'imgs/icons/eye-check-outline.svg')
//     };
// }

// Book.prototype.readIcon = $(`[data-unique-id="${this.id}"]`);

/* Refactored above code to to use Class syntax - Assignment from Classes Module(JavaScript Course) */
class Book {
    constructor(title, author, pages, read) {
        this.title = title,
            this.author = author,
            this.pages = pages,
            this.read = read,
            this.id = crypto.randomUUID();
    }
    changeReadStatus() {
        this.card = $(`[data-unique-id="${this.id}"]`);
        this.readIcon = this.card.lastElementChild.lastElementChild;
        if (this.read) {
            this.read = false;
            this.readIcon.setAttribute('src', 'imgs/icons/eye-outline.svg')
        } else {
            this.read = true;
            this.readIcon.setAttribute('src', 'imgs/icons/eye-check-outline.svg')
        };
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(
        new Book(title, author, pages, read)
    );
}

function createElement(tagName) {
    return document.createElement(tagName);
}

function setClass(element, myClass) {
    element.classList.add(myClass);
}

function $(element) {
    return document.querySelector(element);
}

function createCardForBook(book) {
    const card = createElement('div');
    const cover = createElement('img');
    const text = createElement('div');
    const title = createElement('p');
    const author = createElement('p');
    const pages = createElement('p');
    const readIcon = createElement('img');
    const removeButton = createElement('img');

    setClass(card, "card");
    setClass(cover, "cover");
    setClass(text, "text");
    setClass(title, "title");
    setClass(author, "author");
    setClass(pages, "pages");
    setClass(readIcon, "read");
    setClass(removeButton, "remove-button");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} Pages`;

    card.setAttribute("data-unique-id", `${book.id}`);
    book.read ?
        readIcon.setAttribute("src", 'imgs/icons/eye-check-outline.svg') :
        readIcon.setAttribute("src", 'imgs/icons/eye-outline.svg');
    myLibrary.indexOf(book) + 1 > 8 ?
        cover.setAttribute("src", `imgs/default.png`) :
        cover.setAttribute("src", `imgs/book${myLibrary.indexOf(book) + 1}.jpeg`);
    removeButton.setAttribute("src", 'imgs/icons/close.svg');

    library.appendChild(card);
    card.append(removeButton, cover, text);
    text.append(title, pages, author, readIcon);

    removeButton.addEventListener("click", (event) => event.target.parentElement.remove());

    card.addEventListener('click', () => { book.changeReadStatus() });
}

function displayBookOnPage() {
    myLibrary.forEach(book => createCardForBook(book));
}

function clearFormInputs() {
    title.value = '';
    author.value = '';
    pages.value = '';
    formReadStatusTrue.checked === true ? formReadStatusTrue.checked = false :
        formReadStatusFalse.checked === true ? formReadStatusFalse.checked = false :
            'nothing selected';
}

function checkFormTitle() {
  const title  = formTitle.value.trim();
  if(title.length === 0){
    formTitle.setCustomValidity('The title must be filled!')
  } else {
    formTitle.setCustomValidity('');
  }
}

function checkFormAuthor() {
  const author  = formAuthor.value.trim();
  if(author.length === 0){
    formAuthor.setCustomValidity('The author name must be filled!')
  } else {
    formAuthor.setCustomValidity('');
  }
}

function checkFormPages() {
  const pages  = Number(formPages.value);
  if(pages<1){
    formPages.setCustomValidity('The page count must at least be 1!')
  } else {
    formPages.setCustomValidity('');
  }
}

function checkFormReadStatus() {
  if(formReadStatusTrue.checked || formReadStatusFalse.checked) {
    formReadStatusFalse.setCustomValidity('');
  } else {
    formReadStatusFalse.setCustomValidity('Select a read status!');
  }
}

function addNewBook(event) {
    event.preventDefault();
    dialog.close();
    const book = new Book(title.value, author.value, pages.value, formReadStatusTrue.checked);
    myLibrary.push(book);
    createCardForBook(book);
    clearFormInputs();
}

function checkForm(){
    checkFormAuthor();
    checkFormTitle();
    checkFormPages();
    checkFormReadStatus();
}

function submitForm(event) {
    checkForm();
    if(form.checkValidity() === false) return;
    addNewBook(event);
}

const myLibrary = [];

const container = $('.container');
const library = $('.library');
const dialog = $('dialog');
const form = $('form');
const showButton = $('button.show');
const closeButton = $('.image.close');
const formTitle = $('#title');
const formAuthor = $('#author');
const formPages = $('#pages');
const formReadStatusTrue = $('#true');
const formReadStatusFalse = $('#false');
const submit = $('button.submit');

container.appendChild(showButton); // Move to last child after script injection of DOM nodes


//////// Code Execution ////////

addBookToLibrary('Anna Karenina', 'Leo Tolstoy', 397, true);
addBookToLibrary('Harry Potter and the Deathly Hallows', 'J.K. Rowling', 784, true);
addBookToLibrary('Adventures of Huckleberry Finn', 'Mark Twain', 362, false);
addBookToLibrary('Sunrise on the Reaping', 'Suzanne Collins', 400, false);
addBookToLibrary('Onyx Storm', 'Rebecca Yarros', 544, true);
addBookToLibrary('The Catcher in the Rye', 'J.D. Salinger', 304, false);
addBookToLibrary('Lolita', 'Vladimir Nabokov', 317, false);
addBookToLibrary('The Stand', 'Stephen King', 1_152, true);

displayBookOnPage();

showButton.addEventListener("click", () => dialog.showModal());
closeButton.addEventListener("click", (event) => {
    clearFormInputs();
    event.preventDefault();
    dialog.close();
});

formTitle.addEventListener('input', checkFormTitle);
formAuthor.addEventListener('input', checkFormAuthor);
formPages.addEventListener('input', checkFormPages);
submit.addEventListener("click", submitForm);
