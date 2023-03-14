function taggedPrompt(strings, input) {
  return DOMPurify.sanitize(`${strings[0]}${input}`);
  //   return `${strings[0]}${input}`;
}

export function initialize() {
  document
    .getElementById("alert-btn")
    .addEventListener("click", showAlertDialog);

  document
    .getElementById("confirm-btn")
    .addEventListener("click", showConfirmDialog);

  document
    .getElementById("prompt-btn")
    .addEventListener("click", showPromptDialog);
}

export function showAlertDialog(args) {
  document.getElementById("main-output").style.visibility = "hidden";

  let el = document.createElement("dialog");
  el.setAttribute("autofocus", "");
  el.setAttribute("style", "text-align: center;");

  let title = document.createElement("p");
  title.innerText = `Alert Pressed!`;
  el.appendChild(title);

  let accept = document.createElement("button");
  accept.innerText = "Ok";
  accept.setAttribute("id", "close-btn");
  el.appendChild(accept);

  document.body.appendChild(el);

  document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
  });

  el.showModal();
}

export function showConfirmDialog(user) {
  document.getElementById("main-output").style.visibility = "hidden";

  let el = document.createElement("dialog");
  el.setAttribute("autofocus", "");
  el.setAttribute("style", "text-align: center;");

  let title = document.createElement("p");
  title.innerText = `Do you confirm this?`;
  el.appendChild(title);

  let cancel = document.createElement("button");
  cancel.innerText = "Cancel";
  cancel.setAttribute("id", "close-btn");
  cancel.onclick = () => {
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
    document.getElementById("main-output").style.visibility = "visible";
    document.getElementById("main-output").innerText = "Confirm result: false";
  };
  el.appendChild(cancel);

  let accept = document.createElement("button");
  accept.innerText = "Ok";
  accept.setAttribute("id", "accept-btn");
  accept.onclick = () => {
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
    document.getElementById("main-output").style.visibility = "visible";
    document.getElementById("main-output").innerText = "Confirm result: true";
  };
  el.appendChild(accept);

  document.body.appendChild(el);

  el.showModal();
}

export function showPromptDialog(args) {
  document.getElementById("main-output").style.visibility = "hidden";

  let el = document.createElement("dialog");
  el.setAttribute("autofocus", "");
  el.setAttribute("style", "text-align: center;");

  let title = document.createElement("p");
  title.innerText = `What is your name?`;
  el.appendChild(title);

  let input = document.createElement("input");
  input.setAttribute("id", "input");
  el.appendChild(input);

  let br = document.createElement("br");
  el.appendChild(br);

  let cancel = document.createElement("button");
  cancel.innerText = "Cancel";
  cancel.setAttribute("id", "close-btn");
  cancel.onclick = () => {
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
    document.getElementById("main-output").style.visibility = "visible";
    document.getElementById("main-output").innerHTML = "Prompt result: empty";
  };
  el.appendChild(cancel);

  let accept = document.createElement("button");
  accept.innerText = "Ok";
  accept.setAttribute("id", "accept-btn");
  accept.onclick = () => {
    let input = document.getElementById("input").value;
    document.getElementById("main-output").style.visibility = "visible";

    if (input) {
      document.getElementById(
        "main-output"
      ).innerHTML = taggedPrompt`Prompt result: ${input}`;
    } else {
      document.getElementById("main-output").innerHTML = "Prompt result: empty";
    }

    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
  };
  el.appendChild(accept);

  document.body.appendChild(el);

  el.showModal();
}
