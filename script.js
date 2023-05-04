let myLibrary = [];

const btn = document.querySelector(".add");

const bookCards = document.querySelector(".book-cards");
const bookContainer = document.querySelector('.book-cards');

const btnAdd = document.querySelector('.btn-add');
const btnClose = document.querySelector('.form-exit');
const btnSubmit = document.querySelector('.form-submit');
const btnEdit = document.querySelector('.form-edit');
const formAdd = document.querySelector('#form-add-book');

const formAuthor = document.querySelector('#form-book-author');
const formTitle = document.querySelector('#form-book-title');
const formPages = document.querySelector('#form-book-pages');
const formReadStatus = document.querySelector('#read-status-check');

let isButtonCreated = false;
let isEdited = false;

let currIndex;
let currBook;

btnAdd.addEventListener('click', () => {
  formAdd.style.display = 'flex';
  btnEdit.style.display = 'none';
  btnSubmit.style.display = 'block';
  clearFormFields();
});

btnClose.addEventListener('click', () => {
  clearFormFields();
  formAdd.style.display = 'none';
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
  this.id = Math.floor(Math.random() * 1000000);
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

  bookItem.setAttribute('id', index);
  bookItem.setAttribute('key', index);
  bookItem.setAttribute('class', 'book-card');

  bookItem.appendChild(createBookElement("button", "btn delete", "X"));
  bookItem.appendChild(createBookElement('h3', 'title', `Title: ${book.title}`));
  bookItem.appendChild(createBookElement('p', 'author', `Author: ${book.author}`));
  bookItem.appendChild(createBookElement('p', 'title', `Pages: ${book.pages}`));

  bookItem.appendChild(createReadElement(bookItem, book));

  bookItem.appendChild(createBookElement("button", "edit-book", "edit"));
  isButtonCreated = true;

  bookContainer.insertAdjacentElement("afterbegin", bookItem);

  bookItem.querySelector('.delete').addEventListener('click', () => {
    deleteBook(index);
  });

  const btnEditBook = bookItem.querySelector('.edit-book');

  btnEditBook.addEventListener('click', (e) => {
    isEdited = true;

    if(isEdited) {
      console.log(book.id);
      console.log(index);
      
      currIndex = index;
      currBook = book;

       console.log(currBook.id);
  
  formAdd.style.display = 'flex';
  btnEdit.style.display = 'block';
  btnEdit.value = 'edit Book';
  btnSubmit.style.display = 'none';

  formTitle.value = currBook.title;
  formAuthor.value = currBook.author;
  formPages.value = currBook.pages;
  formReadStatus.checked = currBook.read;

  btnEdit.addEventListener('click', () => {

      if(isEdited) {
        currBook.title = formTitle.value;
        currBook.author = formAuthor.value;
        currBook.pages = formPages.value;
        currBook.read = formReadStatus.checked;
        formAdd.style.display = 'none';
        isEdited = false;
      }

      renderBooks();
  });

    }

  })
  return bookItem;
}


function deleteBook(index) {
  myLibrary.splice(index,1);
  renderBooks();
}

// function editBook(currBook, currIndex) {

//   formAdd.style.display = 'flex';
//   btnEdit.style.display = 'block';
//   btnEdit.value = 'edit Book';
//   btnSubmit.style.display = 'none';

//   formTitle.value = currBook.title;
//   formAuthor.value = currBook.author;
//   formPages.value = currBook.pages;
//   formReadStatus.checked = currBook.read;

//   btnEdit.addEventListener('click', () => {

//       if(isEdited) {
//         currBook.title = formTitle.value;
//         currBook.author = formAuthor.value;
//         currBook.pages = formPages.value;
//         currBook.read = formReadStatus.checked;
//         formAdd.style.display = 'none';
//         console.log(currBook.id);
//         console.log(currIndex);
//         isEdited = false;
//       }

//       // clearFormFields();
//       renderBooks();
//   });

// }

function clearFormFields() {
  formTitle.value = '';
  formAuthor.value = '';
  formPages.value = '';
  formReadStatus.checked = false;
}

  

  function renderBooks() {
    bookCards.textContent = '';
    isEdited = false;
    myLibrary.map((book, index) => {
      createBookItem(book, index);
    });
  }