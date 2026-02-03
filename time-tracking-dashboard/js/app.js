const content = document.getElementById("content");
const selector = document.querySelector(".timeframe-selector");

let selectedTimeframe = "weekly";
let appData = [];

const buttons = document.querySelectorAll(".timeframe-btn");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });

    this.classList.add("active");
  });
});

selector.addEventListener("click", (e) => {
  if (e.target.matches("button[data-timeframe]")) {
    selectedTimeframe = e.target.dataset.timeframe;
  }

  if (appData.length > 0) {
    updateCards();
  } else {
    console.log("no data");
  }
});

const updateCards = () => {
  content.innerHTML = "";

  appData.forEach((item) => {
    appendItem(item);
  });
};

/* Create each card */
const appendItem = (item) => {
  const card = document.createElement("section");
  card.classList.add("card");

  const timeframeData = item.timeframes[selectedTimeframe];

  let period;
  if (selectedTimeframe === "daily") {
    period = "Yesterday";
  } else if (selectedTimeframe === "weekly") {
    period = "Last Week";
  } else {
    period = "Last Month";
  }

  card.innerHTML = `
      <div class="card__content">

        <div class="row">
          <h2 class="card__title">${item.title}</h2>
          <img src="./assets/images/icon-ellipsis.svg" alt="" class="icon-menu" aria-hidden="true">
        </div>
        <div class="card__details">
          <p  class="card__details--hours">${timeframeData.current} hrs</p>
          <p class="card__details--period">${period} - ${timeframeData.previous} hrs</p>
        </div>
      </div>
    
  `;

  content.appendChild(card);
};

const populateDOM = (data) => {
  appData = data;

  appData.forEach((item) => {
    appendItem(item);
  });
};

fetch("./js/data.json")
  .then((response) => {
    if (!response.ok) return console.log("oops! Something went wrong");

    return response.json();
  })
  .then((data) => {
    populateDOM(data);
  });
