let myLibrary = [];

const btn = document.querySelector(".add");

const bookCards = document.querySelector(".book-cards");

let cardAuthor = document.querySelector('.author');
let cardTitle = document.querySelector('.title');
let cardPages = document.querySelector('.pages');
let cardStatus = document.querySelector('.status');
let bookContainer = document.querySelector('.book-cards');

const btnAdd = document.querySelector('.btn-add');
const btnClose = document.querySelector('.form-exit');
const btnSubmit = document.querySelector('.form-submit');
const formAdd = document.querySelector('#form-add-book');

const formAuthor = document.querySelector('#form-book-author');
const formTitle = document.querySelector('#form-book-title');
const formPages = document.querySelector('#form-book-pages');
const formReadStatus = document.querySelector('#read-status-check');

btnAdd.addEventListener('click', () => {
  formAdd.style.display = 'flex';
});

btnClose.addEventListener('click', () => {
  formAdd.style.display = 'none';
});

btnSubmit.addEventListener('click', () => {
  let newTitle = formTitle.value;
  let newAuthor = formAuthor.value;
  let newPages = formPages.value;
  let newReadStatus = formReadStatus.value;

  let newBook = new Book(newTitle, newAuthor, newPages, newReadStatus);
  myLibrary.push(newBook);
  renderBooks();

});

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function createBookElement(el, className, content) {
  const element = document.createElement(el);
  element.setAttribute('class', className);
  element.textContent = content;

  return element;
}

function createReadElement(el, type, content) {
  const element = document.createElement(el);
  element.setAttribute('type', type);
  element.setAttribute('id', 'read-status');
  
  let label = document.createElement('label');

  label.setAttribute('for', 'read-status');
  label.textContent = 'Read?';
  element.appendChild(label);
  
  

  return element;
}

function createBookItem(book, index) {
  const bookItem = document.createElement('div');

  bookItem.setAttribute('id', index);
  bookItem.setAttribute('key', index);
  bookItem.setAttribute('class', 'book-card');

  bookItem.appendChild(createBookElement('h3', 'title', `Title: ${book.title}`));
  bookItem.appendChild(createBookElement('p', 'author', `Author: ${book.author}`));
  bookItem.appendChild(createBookElement('p', 'title', `Pages: ${book.pages}`));
  //bookItem.appendChild(createReadElement('input', 'checkbox', `Read? ${book.status}`));


  bookItem.appendChild(createReadElement('input', 'checkbox', 'test'));

  bookContainer.insertAdjacentElement("afterbegin", bookItem);

}

function renderBooks() {
  myLibrary.map((book, index) => {
    createBookItem(book, index);
  });
}

renderBooks();