/* Constants */
const URL_DATA = "./js/data.json";
const content = document.getElementById("content");

/* State management */
const state = {
  selectedPeriod: "weekly",
  appData: [],
};

/* Helpers */
const getPeriodText = (period) => {
  const periodMap = {
    daily: "Yesterday",
    weekly: "Last week",
    monthly: "Last month",
  };
  return periodMap[period];
};

const createCardHTML = (item, period) => {
  const currentHours = item.timeframes[period].current;
  const previousHours = item.timeframes[period].previous;
  const textPeriod = getPeriodText(period);

  return `
    <section class="card">
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
    </section>  
  `;
};

/* DOM manipulation */
const updateCards = () => {
  content.innerHTML = state.appData
    .map((item) => createCardHTML(item, state.selectedPeriod))
    .join("");
};

/* Event handling */
const setupEventListeners = () => {
  const container = document.querySelector(".timeframe-selector");
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("timeframe-btn")) {
      e.preventDefault();

      const buttons = document.querySelectorAll(".timeframe-btn");
      buttons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");

      state.selectedPeriod = e.target.dataset.timeframe;

      updateCards();
    }
  });
};

/* Initialization */
const initializeApp = () => {
  fetch(URL_DATA)
    .then((response) => {
      if (!response.ok) return console.log("oops! Something went wrong");

      return response.json();
    })
    .then((data) => {
      state.appData = dat;

      updateCards();
      setupEventListeners();
    })
    .catch((error) => {
      console.log("Error loading data", error);
      content.innerHTML = `
        <div class="error">
          <p class="error">Error loading data. Please try again later.</p>
        </div>
      `;
    });
};

/* Start */
initializeApp();
