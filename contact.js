export function sendForm() {
  let el = document.createElement("dialog");
  el.setAttribute("autofocus", "");

  let title = document.createElement("p");
  title.innerHTML = `<b>Form Submitted</b>`;
  el.appendChild(title);

  let thanks = document.createElement("p");
  thanks.innerText = `Thank you for your feedback! If necessary, I'll be in touch with a response soon.`;
  el.appendChild(thanks);

  let accept = document.createElement("button");
  accept.innerText = "Ask Another Question";
  accept.setAttribute("id", "close-btn");
  el.appendChild(accept);

  let home = document.createElement("button");
  home.innerText = "Return to Home";
  home.setAttribute("id", "home-btn");
  el.appendChild(home);

  document.body.appendChild(el);

  document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
  });
  document.getElementById("home-btn").addEventListener("click", () => {
    location.href = "./index.html";
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
  });

  el.showModal();
}
