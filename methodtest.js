let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState === XMLHttpRequest.DONE) {
    if (this.status === 200) {
      let res = JSON.parse(this.responseText);
      writeThatStuff(res);
    } else {
      alert("Error:", this.statusText);
    }
  }
};

async function urlAsync(
  action,
  id,
  article_name,
  article_body,
  date,
  target,
  quer
) {
  if (action == "get" || action == "delete") {
    let response = await fetch(`${target}?${quer}`, {
      method: action,
    })
      .then((response) => response.json())
      .then((res) => {
        writeThatStuff(res);
      });
  } else if (action == "post" || action == "put") {
    let response = await fetch(`${target}`, {
      method: action,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `id=${id}&article_name=${article_name}&article_body=${article_body}&date=${date}`,
    })
      .then((response) => response.json())
      .then((res) => {
        writeThatStuff(res);
      });
  }
}

export function sendThatStuff(action) {
  let id = document.getElementById("id").value;
  let article_name = document.getElementById("article_name").value;
  let article_body = document.getElementById("article_body").value;
  document.getElementById("date").value = new Date();
  let date = document.getElementById("date").value;

  let target = `https://httpbin.org/${action}`;
  let quer = `id=${id}&article_name=${article_name}&article_body=${article_body}&date=${date}`;

  if (document.getElementById("XHR").checked) {
    //GET and DELETE
    if (action == "get" || action == "delete") {
      xhr.open(`${action}`, `${target}?${quer}`);
      xhr.send();
    }
    //POST and PUT
    else {
      xhr.open(`${action}`, `${target}`);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(quer);
    }
  } else if (document.getElementById("Fetch").checked) {
    urlAsync(action, id, article_name, article_body, date, target, quer);
  }
}

function writeThatStuff(res) {
  let text = "<h2>HTTP Response</h2>";
  text += "<table>";
  text += "<tr id='titles'><td>Header Name</td><td>Header Value</td></tr>";
  for (let x in res) {
    text += "<tr>";
    text += `<td style="text-align: center;">${x}</td>`;
    text += "<td>";

    if (typeof res[x] != "string") {
      if (res[x] == null || Object.keys(res[x]).length == 0) {
        text += `null`;
      } else {
        for (let i in res[x]) {
          text += `<b>${i}</b>: ${res[x][i]}`;
          text += "<br />";
        }
      }
    } else {
      if (res[x].length == 0) {
        text += "null";
      } else {
        text += res[x];
      }
    }
    text += "</td>";
    text += "</tr>";
  }
  text += "</table>";
  document.getElementById("response").innerHTML = text;
}
