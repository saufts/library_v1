const btn = document.querySelector(".add");

const bookCards = document.querySelector(".book-cards");

let cardAuthor = document.querySelector('.author');
let cardTitle = document.querySelector('.title');
let cardPages = document.querySelector('.pages');
let cardStatus = document.querySelector('.status');

const btnAdd = document.querySelector('.btn-add');
const btnClose = document.querySelector('.form-exit');
const formAdd = document.querySelector('#form-add-book');



btnAdd.addEventListener('click', () => {
  formAdd.style.display = 'flex';
});

btnClose.addEventListener('click', () => {
  formAdd.style.display = 'none';
});

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;

}
