import {
  showDeleteDialog,
  showEditDialog,
  showAddDialog,
} from "./cruddialogs.js";

export var db = [];
var firstLoad = localStorage.getItem("firstLoad");

export function isNew() {
  return firstLoad == null;
}

export function setSeen() {
  localStorage.setItem("firstLoad", false);
  return (firstLoad = false);
}

export function notifyDBChanged() {
  localStorage.setItem("db", JSON.stringify(db));
  db = JSON.parse(localStorage.getItem("db"));
  document.getElementById("list-container").innerHTML = "";
  renderExisting();
}

function createLIFromString(htmlstring) {
  let newLI = document.createElement("li");
  newLI.innerHTML = htmlstring;

  return newLI;
}

function taggedBlog(strings, name, date, summary) {
  return DOMPurify.sanitize(`${name} (${date}) - ${summary} 
    <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`);
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
  showEditDialog(this.parentElement.innerHTML);
}

export function deleteBlog() {
  showDeleteDialog(this.parentElement.innerHTML);
}

export function dbFind(query) {
  for (let i = 0; i < db.length; i++) {
    if (db[i] == query) return i;
  }
  return -1;
}

export function renderExisting() {
  if (document.getElementById("empty-message")) {
    document.getElementById("empty-message").remove();
  }

  db = JSON.parse(localStorage.getItem("db"));
  if (db) {
    if (db.length == 0) {
      let emptyMessage = document.createElement("p");
      emptyMessage.setAttribute("id", "empty-message");
      emptyMessage.innerText = "No blog posts currently listed\n";
      document.getElementById("add-btn").before(emptyMessage);
    } else {
      for (let i = 0; i < db.length; i++) {
        document
          .getElementById("list-container")
          .appendChild(createLIFromString(DOMPurify.sanitize(db[i])));
      }
    }

    coupleOnClicks();
  } else {
    db = [];
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

  db.push(p1.innerHTML);

  let p2 = document.createElement("li");
  let p2Title = "How Not to Learn Polymorphism";
  let p2Date = "June 6, 2020";
  let p2Summary =
    "Ever wondered what you should definitely not do when studying one of the three tenets of object-oriented programing? Look no further!";
  p2.innerHTML = taggedBlog`${p2Title}${p2Date}${p2Summary}`;

  db.push(p2.innerHTML);

  let p3 = document.createElement("li");
  let p3Title = "Neon Law Foundation: Cyberlaw at it's Most Human";
  let p3Date = "July 15, 2022";
  let p3Summary =
    "Testimonials from Las Vegas' most driven proponents of cybersecurity and digital awareness.";
  p3.innerHTML = taggedBlog`${p3Title}${p3Date}${p3Summary}`;

  db.push(p3.innerHTML);

  document.getElementById("list-container").appendChild(p1);
  document.getElementById("list-container").appendChild(p2);
  document.getElementById("list-container").appendChild(p3);

  coupleOnClicks();
  notifyDBChanged();
}
