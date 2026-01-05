let clashData = null;

const URL = "http://localhost:3000/cards";

async function getData() {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      console.error("HTTP error:", response.status);
      return;
    }

    const data = await response.json();
    clashData = data.items;
    console.log("Data: ", clashData);
    displayCards();
  } catch (err) {
    console.error("Connection error:", err);
  }
}

const allCards = document.querySelector(".allCards");

function displayCards() {
  allCards.innerHTML = "";
  clashData.forEach((card) => {
    allCards.insertAdjacentHTML(
      "afterbegin",
      `<div class="card flex flex-col items-center border p-2 bg-white rounded">
        <h2 class="text-xl font-bold">${card.name}</h2>
        <img src="${card.iconUrls.medium}" alt="${card.name}"
        </div>`
    );
  });
}

getData();
