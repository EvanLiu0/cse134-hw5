class ButtonCount extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML =
      "<button id='counter' value='0'>Times Clicked: 0</button>";

    let counterBtn = this.shadowRoot.getElementById("counter");

    counterBtn.addEventListener("click", () => {
      counterBtn.setAttribute(
        "value",
        (parseInt(counterBtn.value) + 1).toString()
      );
      counterBtn.innerText = `Times Clicked: ${counterBtn.value}`;
    });
  }
}

window.customElements.define("button-count", ButtonCount);
