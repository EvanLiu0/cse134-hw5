// import "./node_modules/dompurify/dist/purify.js";
import { styleddb, dbFind, notifyDBChanged } from "./styledblog.js";

function createLIFromString(htmlstring) {
  let newLI = document.createElement("li");
  newLI.innerHTML = htmlstring;

  return newLI;
}

function taggedBlog(strings, name, date, summary) {
  return DOMPurify.sanitize(`<h2 class="title">${name}</h2> <p class="date">(${date})</p> <p class="summary">${summary}</p> 
        <p><i class="edit-btn">&#x270E;</i> <i class="delete-btn">&#128465;</i></p>`);
}

export function showAddDialog(args) {
  let el = document.createElement("dialog");
  el.setAttribute("autofocus", "");
  el.setAttribute("style", "text-align: center;");

  let vines1 = document.createElement("img");
  vines1.setAttribute("src", "../assets/images/vines.png");
  el.appendChild(vines1);

  let dialogHead = document.createElement("h2");
  dialogHead.innerText = "Add Post";
  el.appendChild(dialogHead);

  let titleString = document.createElement("label");
  titleString.innerText = "Title: ";
  el.appendChild(titleString);

  let titleInput = document.createElement("input");
  titleInput.setAttribute("id", "titleInput");
  el.appendChild(titleInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let dateTitle = document.createElement("label");
  dateTitle.innerText = "Date: ";
  el.appendChild(dateTitle);

  let dateInput = document.createElement("input");
  dateInput.setAttribute("id", "dateInput");
  el.appendChild(dateInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let summaryTitle = document.createElement("label");
  summaryTitle.innerText = "Summary: ";
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
    styleddb.push(tempLI.innerHTML);
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
    notifyDBChanged();
  };
  el.appendChild(accept);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let vines2 = document.createElement("img");
  vines2.setAttribute("src", "../assets/images/vines.png");
  el.appendChild(vines2);

  document.body.appendChild(el);

  el.showModal();
}

export function showDeleteDialog(args) {
  let el = document.createElement("dialog");
  el.setAttribute("autofocus", "");
  el.setAttribute("style", "text-align: center;");

  let vines1 = document.createElement("img");
  vines1.setAttribute("src", "../assets/images/vines.png");
  el.appendChild(vines1);

  let dialogHead = document.createElement("h2");
  dialogHead.innerText = "Delete Post";
  el.appendChild(dialogHead);

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
      styleddb.splice(dbFind(args), 1);
    }

    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
    notifyDBChanged();
  };

  el.appendChild(accept);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let vines2 = document.createElement("img");
  vines2.setAttribute("src", "../assets/images/vines.png");
  el.appendChild(vines2);

  document.body.appendChild(el);
  el.showModal();
}

export function showEditDialog(args) {
  let el = document.createElement("dialog");
  el.setAttribute("autofocus", "");
  el.setAttribute("style", "text-align: center;");

  let vines1 = document.createElement("img");
  vines1.setAttribute("src", "../assets/images/vines.png");
  el.appendChild(vines1);

  let dialogHead = document.createElement("h2");
  dialogHead.innerText = "Edit Post";
  el.appendChild(dialogHead);

  let titleString = document.createElement("label");
  titleString.innerText = "Title: ";
  el.appendChild(titleString);

  let titleInput = document.createElement("input");
  titleInput.setAttribute("id", "titleInput");
  el.appendChild(titleInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let dateTitle = document.createElement("label");
  dateTitle.innerText = "Date: ";
  el.appendChild(dateTitle);

  let dateInput = document.createElement("input");
  dateInput.setAttribute("id", "dateInput");
  el.appendChild(dateInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let summaryTitle = document.createElement("label");
  summaryTitle.innerText = "Summary: ";
  el.appendChild(summaryTitle);

  let summaryInput = document.createElement("input");
  summaryInput.setAttribute("id", "summaryInput");
  el.appendChild(summaryInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let tempLI = createLIFromString(args);

  titleInput.value = tempLI.childNodes[0].innerHTML;
  dateInput.value = tempLI.childNodes[2].innerHTML.substring(
    1,
    tempLI.childNodes[2].innerHTML.length - 1
  );

  summaryInput.value = tempLI.childNodes[4].innerHTML;

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
    styleddb[dbFind(args)] = tempLI.innerHTML;
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
    notifyDBChanged();
  };
  el.appendChild(accept);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let vines2 = document.createElement("img");
  vines2.setAttribute("src", "../assets/images/vines.png");
  el.appendChild(vines2);

  document.body.appendChild(el);

  el.showModal();
}
