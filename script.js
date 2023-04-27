let myLibrary = [];

const btn = document.querySelector(".add");

const bookCards = document.querySelector(".book-cards");
const bookContainer = document.querySelector('.book-cards');

const btnAdd = document.querySelector('.btn-add');
const btnCloseAddForm = document.querySelector('.form-add-exit');
const btnCloseEditForm = document.querySelector('.form-edit-exit');


const btnSubmit = document.querySelector('.form-submit');
const formAdd = document.querySelector('#form-add-book');
const formEdit = document.querySelector('#form-edit-book');

const formAuthor = document.querySelector('#form-book-author');
const formTitle = document.querySelector('#form-book-title');
const formPages = document.querySelector('#form-book-pages');
const formReadStatus = document.querySelector('#read-status-check');


btnAdd.addEventListener('click', () => {
  formAdd.style.display = 'flex';
});

btnCloseAddForm.addEventListener('click', () => {
  clearFormFields();
  formAdd.style.display = 'none';

});

btnCloseEditForm.addEventListener('click', () => {
  clearFormFields();
  formEdit.style.display = 'none';

});

btnSubmit.addEventListener('click', () => {
  let newTitle = formTitle.value;
  let newAuthor = formAuthor.value;
  let newPages = formPages.value;
  let newReadStatus = formReadStatus.checked; // solved the problem - .checked instead of .value

  let newBook = new Book(newTitle, newAuthor, newPages, newReadStatus);
  myLibrary.push(newBook);
  
  renderBooks();

  clearFormFields();

  formAdd.style.display = 'none';


});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  // this.id = Math.floor(Math.random() * 1000000);
}

function createBookElement(el, className, content) {
  const element = document.createElement(el);
  element.setAttribute('class', className);
  element.textContent = content;

  return element;
}

function createReadElement(bookItem, book) {
  let read = document.createElement('div');
  read.setAttribute('class', 'book-read');
  read.appendChild(createBookElement('h3', 'book-read-status', 'Read?'));
  let input = document.createElement('input');
  input.type = 'checkbox';
  input.addEventListener('click', (e) => {
    if (e.target.checked) {
      bookItem.setAttribute('class', "book-card read-checked");
      book.read = true;
    } else {
      bookItem.setAttribute('class', 'book-card read-unchecked');
      book.read = false;
      input.checked = false;
    }
  });

  if(book.read) {
    input.checked = true;
    bookItem.setAttribute('class', 'book-card read-checked');
  } else {
    input.checked = false;
  }

  read.appendChild(input);
  return read;

}

function createBookItem(book, index) {
  const bookItem = document.createElement('div');

  bookItem.setAttribute('class', 'book-card');

  bookItem.appendChild(createBookElement("button", "btn delete", "X"));
  bookItem.appendChild(createBookElement('h3', 'title', `Title: ${book.title}`));
  bookItem.appendChild(createBookElement('p', 'author', `Author: ${book.author}`));
  bookItem.appendChild(createBookElement('p', 'title', `Pages: ${book.pages}`));

  bookItem.appendChild(createReadElement(bookItem, book));

  bookItem.appendChild(createBookElement("button", "btn edit", "edit"));

  bookContainer.insertAdjacentElement("afterbegin", bookItem);

  bookItem.querySelector('.delete').addEventListener('click', () => {
    deleteBook(index);
  });

  bookItem.querySelector('.edit').addEventListener('click', () => {
    editBook(index);
  })
}

function renderBooks() {
  bookCards.textContent = '';
  myLibrary.map((book, index) => {
    createBookItem(book, index);
  });
}

function deleteBook(index) {
  myLibrary.splice(index,1);
  renderBooks();
}

function editBook(index) {

  console.log(myLibrary[index]);
  formEdit.style.display = 'flex';

  editBookBtn = document.querySelector('.form-edit');
  editBookBtn.value = 'EDIT';

  formTitle.value = myLibrary[index].title;
  formAuthor.value = myLibrary[index].author;
  formPages.value = myLibrary[index].pages;
  formReadStatus.checked = myLibrary[index].read;

}

function clearFormFields() {
  formTitle.value = '';
  formAuthor.value = '';
  formPages.value = '';
  formReadStatus.checked = false;
}
