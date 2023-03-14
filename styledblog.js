// import "./node_modules/dompurify/dist/purify.js";
import {
  showDeleteDialog,
  showEditDialog,
  showAddDialog,
} from "./styledcruddialogs.js";

export var styleddb = [];
var firstLoad = localStorage.getItem("firstLoad");

export function isNew() {
  return firstLoad == null;
}

export function setSeen() {
  localStorage.setItem("firstLoad", false);
  return (firstLoad = false);
}

export function notifyDBChanged() {
  localStorage.setItem("styleddb", JSON.stringify(styleddb));
  styleddb = JSON.parse(localStorage.getItem("styleddb"));
  document.getElementById("list-container").innerHTML = "";
  renderExisting();
}

function createLIFromString(htmlstring) {
  let newLI = document.createElement("li");
  newLI.innerHTML = htmlstring;

  return newLI;
}

function taggedBlog(strings, name, date, summary) {
  return DOMPurify.sanitize(`<h2 class="title">${name}</h2> <p class="date">(${date})</p> <p class="summary">${summary}</p> 
    <p><i class="edit-btn">&#x270E;</i> <i class="delete-btn">&#128465;</i></p>`);
}

function coupleOnClicks() {
  let editButtons = document.getElementsByClassName("edit-btn");
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", editBlog);
  }

  let deleteButtons = document.getElementsByClassName("delete-btn");
  for (let i = 0; i < editButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteBlog);
  }

  document.getElementById("add-btn").addEventListener("click", showAddDialog);
}

export function editBlog() {
  showEditDialog(this.parentElement.parentElement.innerHTML);
}

export function deleteBlog() {
  showDeleteDialog(this.parentElement.parentElement.innerHTML);
}

export function dbFind(query) {
  for (let i = 0; i < styleddb.length; i++) {
    if (styleddb[i] == query) return i;
  }
  return -1;
}

export function renderExisting() {
  if (document.getElementById("empty-message")) {
    document.getElementById("empty-message").remove();
  }

  styleddb = JSON.parse(localStorage.getItem("styleddb"));
  if (styleddb) {
    if (styleddb.length == 0) {
      let emptyMessage = document.createElement("p");
      emptyMessage.setAttribute("id", "empty-message");
      emptyMessage.innerText = "No blog posts currently listed\n";
      document.getElementById("add-btn").after(emptyMessage);
    } else {
      for (let i = 0; i < styleddb.length; i++) {
        document
          .getElementById("list-container")
          .appendChild(createLIFromString(DOMPurify.sanitize(styleddb[i])));
      }
    }

    coupleOnClicks();
  } else {
    styleddb = [];
    initialize();
  }
}

export function initialize() {
  let p1 = document.createElement("li");
  let p1Title = "A Day in the Life of a Machine Learning Major";
  let p1Date = "April 1, 2021";
  let p1Summary =
    "Learn about the technical requirements and emotional damage that come with being a Machine Learning major at UCSD!";
  p1.innerHTML = taggedBlog`${p1Title}${p1Date}${p1Summary}`;

  styleddb.push(p1.innerHTML);

  let p2 = document.createElement("li");
  let p2Title = "How Not to Learn Polymorphism";
  let p2Date = "June 6, 2020";
  let p2Summary =
    "Ever wondered what you should definitely not do when studying one of the three tenets of object-oriented programing? Look no further!";
  p2.innerHTML = taggedBlog`${p2Title}${p2Date}${p2Summary}`;

  styleddb.push(p2.innerHTML);

  let p3 = document.createElement("li");
  let p3Title = "Neon Law Foundation: Cyberlaw at it's Most Human";
  let p3Date = "July 15, 2022";
  let p3Summary =
    "Testimonials from Las Vegas' most driven proponents of cybersecurity and digital awareness.";
  p3.innerHTML = taggedBlog`${p3Title}${p3Date}${p3Summary}`;

  styleddb.push(p3.innerHTML);

  document.getElementById("list-container").appendChild(p1);
  document.getElementById("list-container").appendChild(p2);
  document.getElementById("list-container").appendChild(p3);

  coupleOnClicks();
  notifyDBChanged();
}
