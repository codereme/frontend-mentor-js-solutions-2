const URL = "./js/data.json";

function mostrarPlanes(planes) {
  const cards = document.getElementById("cards");

  cards.innerHTML = "";

  planes.forEach((plan) => {
    const planElemento = document.createElement("div");
    planElemento.classList.add("plan__card");

    planElemento.innerHTML = `
     
            <h2 class="plan__name">${plan.name}</h2>

            <div class="precios">
                <p class="price  price--yearly ${
                  !mostrarMensual ? "active" : ""
                }">&dollar; ${plan.yearly} </p>

                <p class="price  price--monthly ${
                  mostrarMensual ? "active" : ""
                } ">&dollar; ${plan.monthly} </p>
            </div>

            <div class="features">
                <ul>
                    ${plan.features
                      .map((feature) => `<li>${feature}</li>`)
                      .join("")}
                </ul>
            </div>
     
    `;

    cards.appendChild(planElemento);
  });
}

function actualizarToggle() {
  const monthlyLabel = document.getElementById("monthly-label");
  const yearlyLabel = document.getElementById("yearly-label");

  if (mostrarMensual) {
    monthlyLabel.classList.add("active");
    yearlyLabel.classList.remove("active");
  } else {
    monthlyLabel.classList.remove("active");
    yearlyLabel.classList.add("active");
  }
}

let mostrarMensual = true;

function inicializar(data) {
  mostrarPlanes(data);
  actualizarToggle();

  const toggle = document.getElementById("price-toggle");

  toggle.checked = true;

  toggle.addEventListener("change", function () {
    mostrarMensual = this.checked;

    mostrarPlanes(data);
    actualizarToggle();
  });
}

fetch(URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error");
    }
    return response.json();
  })
  .then((data) => {
    inicializar(data.plans);
  })
  .catch((error) => {
    console.error("Error", error);
  });
