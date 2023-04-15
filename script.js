const btn = document.querySelector(".add");

const bookCards = document.querySelector(".book-cards");

let cardAuthor = document.querySelector('.author');
let cardTitle = document.querySelector('.title');
let cardPages = document.querySelector('.pages');
let cardStatus = document.querySelector('.status');

const btnAdd = document.querySelector('.btn-add');
const formAdd = document.querySelector('#form-add-book');



btnAdd.addEventListener('click', () => {
  // document.getElementById('#book-add-form').style.display = block;
  formAdd.style.display = 'block';
});

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;

}
