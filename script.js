const myLibrary = [];

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

const container = document.querySelector(".container");

function createCardForBook(book) {
    const card = document.createElement('div');
    const cover = document.createElement('img');
    const text = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const readStatus = document.createElement('img');

    card.classList.add("card");
    cover.classList.add("cover");
    text.classList.add("text");
    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    readStatus.classList.add("read");

    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages}`;

    readStatus.setAttribute("src", 'imgs/icons/eye-check-outline.svg');
    myLibrary.indexOf(book) + 1 > 8 ?
        cover.setAttribute("src", `imgs/default.png`) :
        cover.setAttribute("src", `imgs/book${myLibrary.indexOf(book) + 1}.jpeg`);

    container.appendChild(card);
    card.appendChild(cover);
    card.appendChild(text);
    text.appendChild(title);
    text.appendChild(pages);
    text.appendChild(author);
    text.appendChild(readStatus);
}

function displayBookOnPage() {
    myLibrary.forEach(book => createCardForBook(book));
}

addBookToLibrary('Anna Karenina', 'Leo Tolstoy', 397, true);
addBookToLibrary('Harry Potter and the Deathly Hallows', 'J.K. Rowling', 784, true);
addBookToLibrary('Adventures of Huckleberry Finn', 'Mark Twain', 362, false);
addBookToLibrary('Sunrise on the Reaping', 'Suzanne Collins', 400, false);
addBookToLibrary('Onyx Storm', 'Rebecca Yarros', 544, true);
addBookToLibrary('The Catcher in the Rye', 'J.D. Salinger', 304, false);
addBookToLibrary('Lolita', 'Vladimir Nabokov', 317, false);
addBookToLibrary('The Stand', 'Stephen King', 1_152, true);
addBookToLibrary('Generic Book', 'John Doe', Infinity, true);
displayBookOnPage();

// console.log(myLibrary[0]);

