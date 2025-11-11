function Book(title, author, pages, read, image) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.image = image;
    this.id = crypto.randomUUID();
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

function createCardForBook(book) {
    const card = createElement('div');
    const cover = createElement('img');
    const text = createElement('div');
    const title = createElement('p');
    const author = createElement('p');
    const pages = createElement('p');
    const readStatus = createElement('img');
    const removeButton = createElement('img');

    setClass(card, "card");
    setClass(cover, "cover");
    setClass(text, "text");
    setClass(title, "title");
    setClass(author, "author");
    setClass(pages, "pages");
    setClass(readStatus, "read");
    setClass(removeButton, "remove-button");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} Pages`;

    readStatus.setAttribute("src", 'imgs/icons/eye-check-outline.svg');
    myLibrary.indexOf(book) + 1 > 8 ?
        cover.setAttribute("src", `imgs/default.png`) :
        cover.setAttribute("src", `imgs/book${myLibrary.indexOf(book) + 1}.jpeg`);
    removeButton.setAttribute("src", 'imgs/icons/close.svg');

    library.appendChild(card);
    card.append(removeButton, cover, text);
    text.append(title, pages, author, readStatus);

    removeButton.addEventListener("click", removeBook);
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

function addNewBook(event) {
    event.preventDefault();
    dialog.close();
    const book = new Book(title.value, author.value, pages.value, formReadStatusTrue.checked === true);
    myLibrary.push(book);
    createCardForBook(book);
    clearFormInputs();
}

function removeBook(event) {
    event.target.parentElement.remove();
}

const myLibrary = [];

const container = document.querySelector('.container');
const library = container.querySelector('.library');
const dialog = document.querySelector('dialog');
const showButton = document.querySelector('button.show');
const closeButton = document.querySelector('.image.close');
const formTitle = dialog.querySelector('#title');
const formAuthor = dialog.querySelector('#author');
const formPages = dialog.querySelector('#pages');
const formReadStatusTrue = dialog.querySelector('#true');
const formReadStatusFalse = dialog.querySelector('#false');
const submit = document.querySelector('button.submit');

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
    console.log(event.target);
    clearFormInputs();
    event.preventDefault();
    dialog.close();
});

submit.addEventListener("click", addNewBook);