// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener("DOMContentLoaded", event => {
  const ul = document.getElementById("quote-list");

  fetch("http://localhost:3000/quotes?_embed=likes")
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      renderPage(result);
    });

  function renderPage(quote) {
    quote.forEach(element => {
      let btnDanger = document.createElement("button");
      btnDanger.classList.add("btn-danger");
      btnDanger.innerText = "Delete";
      let btnSuccess = document.createElement("button");
      btnSuccess.classList.add("btn-success");
      btnSuccess.innerText = "Likes:";
      let spanBtnSuccess = document.createElement("span");
      spanBtnSuccess.innerText = " 0";
      let blockquoteFooter = document.createElement("footer");
      blockquoteFooter.classList.add("blockquote-footer");
      blockquoteFooter.innerText = "Someone famous";
      let paragraph = document.createElement("p");
      paragraph.classList.add("mb-0");
      paragraph.innerText =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.";
      let li = document.createElement("li");
      li.classList.add("quote-card");
      let blockQuote = document.createElement("blockquote");
      btnSuccess.appendChild(spanBtnSuccess);
      blockQuote.appendChild(paragraph);
      blockQuote.appendChild(blockquoteFooter);
      blockQuote.appendChild(btnSuccess);
      blockQuote.appendChild(btnDanger);
      li.appendChild(blockQuote);
      paragraph.innerText = element.quote;
      blockquoteFooter.innerText = element.author;
      ul.appendChild(li);

      btnSuccess.addEventListener("click", event => {
        event.preventDefault();
        console.log("h");
        let numberOfLikes = parseInt(spanBtnSuccess.innerText, 10);
        numberOfLikes = numberOfLikes + 1;
        spanBtnSuccess.innerText = numberOfLikes;

        let formData = {
          quoteId: element.id
        };
        let configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(formData)
        };

        fetch("http://localhost:3000/likes", configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            console.log(object);
          });
      });

      btnDanger.addEventListener("click", function(event) {
        let configObject = {
          method: "DELETE"
        };
        fetch(`http://localhost:3000/quotes/${element.id}`, configObject)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            console.log(object);
            btnDanger.parentElement.parentElement.remove();
          });
      });
    });
  }
  const submitForm = document.getElementById("new-quote-form");

  submitForm.addEventListener("submit", event => {
    event.preventDefault();
    console.log("hiii");
    const newQuote = document.getElementById("new-quote");
    const newAuthor = document.getElementById("author");

    let formData = {
      quote: newQuote.value,
      author: newAuthor.value
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/quotes", configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        console.log(result);

        let btnDanger = document.createElement("button");
        btnDanger.classList.add("btn-danger");
        btnDanger.innerText = "Delete";
        let btnSuccess = document.createElement("button");
        btnSuccess.classList.add("btn-success");
        btnSuccess.innerText = "Likes:";
        let spanBtnSuccess = document.createElement("span");
        spanBtnSuccess.innerText = " 0";
        let blockquoteFooter = document.createElement("footer");
        blockquoteFooter.classList.add("blockquote-footer");
        blockquoteFooter.innerText = "Someone famous";
        let paragraph = document.createElement("p");
        paragraph.classList.add("mb-0");
        paragraph.innerText =
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.";
        let li = document.createElement("li");
        li.classList.add("quote-card");
        let blockQuote = document.createElement("blockquote");
        btnSuccess.appendChild(spanBtnSuccess);
        blockQuote.appendChild(paragraph);
        blockQuote.appendChild(blockquoteFooter);
        blockQuote.appendChild(btnSuccess);
        blockQuote.appendChild(btnDanger);
        li.appendChild(blockQuote);
        paragraph.innerText = result.quote;
        blockquoteFooter.innerText = result.author;
        ul.appendChild(li);
      });
  });
});
