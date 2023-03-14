import { db, dbFind, notifyDBChanged } from "./blog.js";

function createLIFromString(htmlstring) {
  let newLI = document.createElement("li");
  newLI.innerHTML = htmlstring;

  return newLI;
}

function taggedBlog(strings, name, date, summary) {
  if (name != "") {
    return DOMPurify.sanitize(`${name} (${date}) - ${summary} 
    <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`);
  } else {
    return DOMPurify.sanitize(`(${date}) - ${summary} 
        <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`);
  }
}

export function showAddDialog(args) {
  let el = document.createElement("dialog");
  el.setAttribute("autofocus", "");
  el.setAttribute("style", "text-align: center;");

  let dialogHead = document.createElement("h2");
  dialogHead.innerText = "Add Post";
  el.appendChild(dialogHead);

  let titleString = document.createElement("label");
  titleString.innerText = "Post Title: ";
  el.appendChild(titleString);

  let titleInput = document.createElement("input");
  titleInput.setAttribute("id", "titleInput");
  el.appendChild(titleInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let dateTitle = document.createElement("label");
  dateTitle.innerText = "Post Date: ";
  el.appendChild(dateTitle);

  let dateInput = document.createElement("input");
  dateInput.setAttribute("id", "dateInput");
  el.appendChild(dateInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let summaryTitle = document.createElement("label");
  summaryTitle.innerText = "Post Summary: ";
  el.appendChild(summaryTitle);

  let summaryInput = document.createElement("input");
  summaryInput.setAttribute("id", "summaryInput");
  el.appendChild(summaryInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let cancel = document.createElement("button");
  cancel.innerText = "Cancel";
  cancel.setAttribute("id", "close-btn");
  cancel.onclick = () => {
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
  };
  el.appendChild(cancel);

  let accept = document.createElement("button");
  accept.innerText = "Save";
  accept.setAttribute("id", "accept-btn");
  accept.onclick = () => {
    let tempLI = createLIFromString(
      taggedBlog`${document.getElementById("titleInput").value}${
        document.getElementById("dateInput").value
      })${document.getElementById("summaryInput").value}`
    );
    db.push(tempLI.innerHTML);
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
    notifyDBChanged();
  };
  el.appendChild(accept);

  document.body.appendChild(el);

  el.showModal();
}

export function showDeleteDialog(args) {
  let el = document.createElement("dialog");
  el.setAttribute("autofocus", "");
  el.setAttribute("style", "text-align: center;");

  let dialogHead = document.createElement("h2");
  dialogHead.innerText = "Delete Post";
  el.appendChild(dialogHead);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let cancel = document.createElement("button");
  cancel.innerText = "Cancel";
  cancel.setAttribute("id", "close-btn");
  cancel.onclick = () => {
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
  };
  el.appendChild(cancel);

  let accept = document.createElement("button");
  accept.innerText = "Ok";
  accept.setAttribute("id", "accept-btn");
  accept.onclick = () => {
    if (dbFind(args) > -1) {
      db.splice(dbFind(args), 1);
    }

    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
    notifyDBChanged();
  };

  el.appendChild(accept);
  document.body.appendChild(el);
  el.showModal();
}

export function showEditDialog(args) {
  let el = document.createElement("dialog");
  el.setAttribute("autofocus", "");
  el.setAttribute("style", "text-align: center;");

  let dialogHead = document.createElement("h2");
  dialogHead.innerText = "Edit Post";
  el.appendChild(dialogHead);

  let titleString = document.createElement("label");
  titleString.innerText = "Post Title: ";
  el.appendChild(titleString);

  let titleInput = document.createElement("input");
  titleInput.setAttribute("id", "titleInput");
  el.appendChild(titleInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let dateTitle = document.createElement("label");
  dateTitle.innerText = "Post Date: ";
  el.appendChild(dateTitle);

  let dateInput = document.createElement("input");
  dateInput.setAttribute("id", "dateInput");
  el.appendChild(dateInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let summaryTitle = document.createElement("label");
  summaryTitle.innerText = "Post Summary: ";
  el.appendChild(summaryTitle);

  let summaryInput = document.createElement("input");
  summaryInput.setAttribute("id", "summaryInput");
  el.appendChild(summaryInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let tempLI = createLIFromString(args);

  titleInput.value = tempLI.childNodes[0].textContent
    .substring(0, tempLI.childNodes[0].textContent.indexOf("("))
    .trim();
  dateInput.value = tempLI.childNodes[0].textContent
    .substring(
      tempLI.childNodes[0].textContent.indexOf("(") + 1,
      tempLI.childNodes[0].textContent.indexOf(")")
    )
    .trim();

  summaryInput.value = tempLI.childNodes[0].textContent
    .substring(tempLI.childNodes[0].textContent.indexOf("-") + 2)
    .trim();

  let cancel = document.createElement("button");
  cancel.innerText = "Cancel";
  cancel.setAttribute("id", "close-btn");
  cancel.onclick = () => {
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
  };
  el.appendChild(cancel);

  let accept = document.createElement("button");
  accept.innerText = "Save";
  accept.setAttribute("id", "accept-btn");
  accept.onclick = () => {
    tempLI.innerHTML = taggedBlog`${
      document.getElementById("titleInput").value
    }${document.getElementById("dateInput").value})${
      document.getElementById("summaryInput").value
    }`;
    db[dbFind(args)] = tempLI.innerHTML;
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
    notifyDBChanged();
  };
  el.appendChild(accept);

  document.body.appendChild(el);

  el.showModal();
}
