const global = {
  clashData: [],
  filteredData: [],
  apiUrl: "http://localhost:3000/cards",
};
const cardContainer = document.querySelector("#allCards");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

//Reusable/Modern Code -->
const getCards = (data) => {
  cardContainer.innerHTML = "";

  if (data.length === 0) {
    cardContainer.innerHTML = `<p class="col-span-full text-center text-gray-500 text-xl">No cards found.</p>`;
    return;
  }

  // Array Methods -> Using map to join strings
  const cardsHtml = data
    .map(
      (card) => `
        <article class="flex flex-col items-center border p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 class="text-xl font-bold mb-2">${card.name}</h2>
            <h2 class="text-xl font-bold mb-2"> Elixir Cost = ${card.elixirCost}</h2>
            <h2 class="text-xl font-bold mb-2"> Rarity = ${card.rarity}</h2>
            <img src="${card.iconUrls.medium}" alt="${card.name}" class="w-32 h-auto">
        </article>
    `
    )
    .join("");

  cardContainer.insertAdjacentHTML("afterbegin", cardsHtml);
};

// Promise Handling
async function getData() {
  try {
    const response = await fetch(global.apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    global.clashData = data.items;
    global.filteredData = data.items;
    getCards(global.filteredData);
  } catch (err) {
    //IF there is no data --> down
    cardContainer.innerHTML = `
            <div class="col-span-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <h1>Error:</h1> ${err.message}. Backend? New Ip probably D:
            </div>`;
  }
}

// Form Handling: Logic to prevent blank fields and filter results
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = searchInput.value.trim().toLowerCase();

  if (!search) {
    //IF nothing in search bar, then it resets all the cards.
    global.filteredData = global.clashData;
  } else {
    global.filteredData = global.clashData.filter((card) =>
      card.name.toLowerCase().includes(search)
    );
  }

  getCards(global.filteredData);
});

getData();
