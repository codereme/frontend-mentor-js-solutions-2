const URL_DATA = "./js/data.json";

const content = document.getElementById("content");
let selectedPeriod = "weekly";
let appData = [];

fetch(URL_DATA)
  .then((response) => {
    if (!response.ok) return console.log("oops! Something went wrong");

    return response.json();
  })
  .then((data) => {
    appData = data;
    updateCards();
    handleButtons();
  });

const handleButtons = () => {
  const buttons = document.querySelectorAll(".timeframe-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });

      e.target.classList.add("active");

      selectedPeriod = e.target.dataset.timeframe;

      updateCards();
    });
  });
};

const updateCards = () => {
  content.innerHTML = "";

  appData.forEach((item) => {
    appendItem(item);
  });
};

const appendItem = (item) => {
  const card = document.createElement("section");
  card.classList.add("card");

  const currentHours = item.timeframes[selectedPeriod].current;
  const previousHours = item.timeframes[selectedPeriod].previous;

  let textPeriod;

  if (selectedPeriod === "daily") textPeriod = "Yesterday";
  if (selectedPeriod === "weekly") textPeriod = "Last week";
  if (selectedPeriod === "monthly") textPeriod = "Last month";

  card.innerHTML = `
      <div class="card__content">

        <div class="row">
          <h2 class="card__title">${item.title}</h2>
          <img src="./assets/images/icon-ellipsis.svg" alt="" class="icon-menu" aria-hidden="true">
        </div>
        <div class="card__details">
          <p  class="card__details--hours">${currentHours} hrs</p>
          <p class="card__details--period">${textPeriod} - ${previousHours} hrs</p>
        </div>
      </div>
    `;
  content.appendChild(card);
};
