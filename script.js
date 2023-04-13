const btn = document.querySelector(".add");

const bookCards = document.querySelector(".book-cards");

let cardAuthor = document.querySelector('.author');
let cardTitle = document.querySelector('.title');
let cardPages = document.querySelector('.pages');
let cardStatus = document.querySelector('.status');

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;

}
